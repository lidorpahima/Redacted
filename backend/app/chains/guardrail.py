"""
Guardrail Chain
The main RAG + LLM Judge chain for prompt security analysis

This is the BRAIN of the application. It orchestrates the entire analysis pipeline:

FLOW:
1. Pattern Matching (Fast Filter)
   - Check for obvious SQL injection, jailbreak attempts
   - Uses regex patterns
   - < 10ms

2. RAG Retrieval
   - Convert prompt to embedding
   - Search Vector DB for relevant policy documents
   - Retrieve top K documents
   - ~100-200ms

3. LLM Judge
   - Give the LLM: (user prompt + retrieved policies)
   - Ask: "Does this prompt violate any of these policies?"
   - LLM returns: {is_safe: bool, reason: str, confidence: float}
   - ~300-500ms

4. Decision
   - Aggregate results from all steps
   - Return final verdict with explanation

USAGE:
    chain = GuardrailChain()
    result = await chain.analyze("Can I share customer data?")
    if not result.is_safe:
        print(f"BLOCKED: {result.explanation}")
"""

from typing import Dict, Any, List, Optional
from dataclasses import dataclass
import re
import time
import logging

# TODO: Uncomment when implementing
# from langchain.chains import LLMChain
# from langchain.prompts import PromptTemplate
# from app.services.vector_db import VectorDBService
# from app.services.llm_provider import LLMProvider
# from app.chains.prompts import JUDGE_SYSTEM_PROMPT

logger = logging.getLogger(__name__)


@dataclass
class GuardrailResult:
    """Result from the guardrail chain"""
    is_safe: bool
    confidence: float
    threat_type: Optional[str] = None
    explanation: Optional[str] = None
    violated_policies: Optional[List[str]] = None
    retrieved_documents: Optional[List[Dict[str, Any]]] = None
    steps: Optional[List[Dict[str, Any]]] = None


class GuardrailChain:
    """
    Main guardrail chain that orchestrates the security analysis
    """

    def __init__(self):
        """
        Initialize the guardrail chain
        TODO: Initialize Vector DB, LLM, etc.
        """
        logger.info("Initializing GuardrailChain...")

        # TODO: Initialize components
        # self.vector_db = VectorDBService()
        # self.llm = LLMProvider()

        # Load dangerous patterns
        self.dangerous_patterns = self._load_dangerous_patterns()

    def _load_dangerous_patterns(self) -> List[re.Pattern]:
        """
        Load regex patterns for common attacks
        These are checked FIRST before any expensive operations
        """
        patterns = [
            # SQL Injection
            r"(union\s+select|drop\s+table|insert\s+into|delete\s+from)",

            # Classic Jailbreaks
            r"(ignore\s+(all\s+)?(previous|prior|above)\s+instructions)",
            r"(disregard\s+(the\s+)?(above|previous))",
            r"(you\s+are\s+now\s+(a|an))",
            r"(act\s+as\s+if\s+you\s+are)",

            # System Prompt Leakage
            r"(what\s+(is|are)\s+your\s+(system\s+)?instructions)",
            r"(show\s+me\s+your\s+(system\s+)?prompt)",
            r"(reveal\s+your\s+(system\s+)?prompt)",

            # Delimiter Attacks
            r"(---END---|###SYSTEM|<\|endoftext\|>)",
        ]

        return [re.compile(p, re.IGNORECASE) for p in patterns]

    async def analyze(self, prompt: str, context: Optional[Dict] = None) -> GuardrailResult:
        """
        Main analysis method - runs the prompt through all checks

        Args:
            prompt: The user's input prompt
            context: Optional context (user_id, session_id, etc.)

        Returns:
            GuardrailResult with the analysis verdict
        """
        steps = []
        start_time = time.time()

        try:
            # STEP 1: Pattern Matching (Fast Filter)
            logger.info("Step 1: Pattern matching...")
            pattern_result = self._check_patterns(prompt)
            steps.append({
                "name": "pattern_check",
                "passed": pattern_result["passed"],
                "duration_ms": pattern_result["duration_ms"],
                "details": pattern_result
            })

            if not pattern_result["passed"]:
                return GuardrailResult(
                    is_safe=False,
                    confidence=0.95,
                    threat_type="pattern_match",
                    explanation=f"Detected malicious pattern: {pattern_result['matched_pattern']}",
                    steps=steps
                )

            # STEP 2: RAG Retrieval
            logger.info("Step 2: RAG retrieval...")
            rag_start = time.time()
            retrieved_docs = await self._retrieve_policies(prompt)
            rag_duration = int((time.time() - rag_start) * 1000)

            steps.append({
                "name": "rag_retrieval",
                "passed": True,
                "duration_ms": rag_duration,
                "details": {
                    "num_documents": len(retrieved_docs),
                    "documents": [doc["source"] for doc in retrieved_docs]
                }
            })

            # STEP 3: LLM Judge
            logger.info("Step 3: LLM judge evaluation...")
            judge_start = time.time()
            judge_result = await self._llm_judge(prompt, retrieved_docs)
            judge_duration = int((time.time() - judge_start) * 1000)

            steps.append({
                "name": "llm_judge",
                "passed": judge_result["is_safe"],
                "duration_ms": judge_duration,
                "details": judge_result
            })

            # Return final result
            return GuardrailResult(
                is_safe=judge_result["is_safe"],
                confidence=judge_result["confidence"],
                threat_type=judge_result.get("threat_type"),
                explanation=judge_result.get("explanation"),
                violated_policies=judge_result.get("violated_policies"),
                retrieved_documents=retrieved_docs,
                steps=steps
            )

        except Exception as e:
            logger.error(f"Error in guardrail chain: {str(e)}")
            raise

    def _check_patterns(self, prompt: str) -> Dict[str, Any]:
        """
        Step 1: Fast pattern matching
        Check for obvious malicious patterns using regex

        Returns:
            Dict with passed status and matched pattern (if any)
        """
        start = time.time()

        for pattern in self.dangerous_patterns:
            match = pattern.search(prompt)
            if match:
                return {
                    "passed": False,
                    "matched_pattern": match.group(0),
                    "duration_ms": int((time.time() - start) * 1000)
                }

        return {
            "passed": True,
            "duration_ms": int((time.time() - start) * 1000)
        }

    async def _retrieve_policies(self, prompt: str) -> List[Dict[str, Any]]:
        """
        Step 2: RAG retrieval
        Query the vector database for relevant policy documents

        TODO: Implement actual vector DB search
        For now, returns mock documents
        """
        # TODO: Implement
        # results = await self.vector_db.search(prompt, top_k=3)
        # return results

        # Mock response
        return [
            {
                "source": "Data_Privacy_Policy.pdf",
                "section": "4.2",
                "content": "Customer data must not be shared with third parties without explicit consent.",
                "score": 0.89
            },
            {
                "source": "HR_Manual.pdf",
                "section": "2.1",
                "content": "Employee information is confidential and protected.",
                "score": 0.76
            }
        ]

    async def _llm_judge(self, prompt: str, policies: List[Dict]) -> Dict[str, Any]:
        """
        Step 3: LLM Judge
        Use an LLM to evaluate if the prompt violates any policies

        Args:
            prompt: User's prompt
            policies: Retrieved policy documents from RAG

        Returns:
            Dict with is_safe, confidence, and explanation

        TODO: Implement actual LLM call
        """
        # TODO: Implement
        # from app.chains.prompts import JUDGE_SYSTEM_PROMPT
        # result = await self.llm.evaluate(
        #     system_prompt=JUDGE_SYSTEM_PROMPT,
        #     user_prompt=prompt,
        #     context=policies
        # )
        # return result

        # Mock response - SAFE
        return {
            "is_safe": True,
            "confidence": 0.92,
            "explanation": "This prompt does not appear to violate any policies."
        }

        # Mock response - UNSAFE (example)
        # return {
        #     "is_safe": False,
        #     "confidence": 0.89,
        #     "threat_type": "policy_violation",
        #     "explanation": "This request violates the Data Privacy Policy section 4.2",
        #     "violated_policies": ["Data_Privacy_Policy.pdf - Section 4.2"]
        # }
