"""
Analyze Endpoint
Main API endpoint for prompt security analysis

This is the core endpoint of the application. It receives a user prompt,
runs it through the guardrail chain (pattern matching → RAG → LLM judge),
and returns whether the prompt is safe or unsafe.

Expected Request:
{
    "prompt": "Can I share customer emails with vendors?",
    "context": {
        "user_id": "user123",
        "session_id": "session456"
    },
    "config": {
        "strict_mode": false
    }
}

Expected Response (Safe):
{
    "is_safe": true,
    "confidence": 0.95,
    "processing_time_ms": 234,
    "steps": [...]
}

Expected Response (Unsafe):
{
    "is_safe": false,
    "confidence": 0.92,
    "threat_type": "policy_violation",
    "explanation": "This request violates the Data Privacy Policy section 4.2",
    "violated_policies": ["Data Privacy Policy - Section 4.2"],
    "processing_time_ms": 456,
    "steps": [...]
}
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
import time
import logging

# TODO: Import guardrail chain when implemented
# from app.chains.guardrail import GuardrailChain

logger = logging.getLogger(__name__)
router = APIRouter()


# ============================================================================
# REQUEST & RESPONSE MODELS
# ============================================================================

class AnalysisContext(BaseModel):
    """Optional context about the request"""
    user_id: Optional[str] = None
    session_id: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


class AnalysisConfig(BaseModel):
    """Configuration for the analysis"""
    strict_mode: bool = False
    skip_cache: bool = False


class AnalyzeRequest(BaseModel):
    """Request model for prompt analysis"""
    prompt: str = Field(..., min_length=1, max_length=4000)
    context: Optional[AnalysisContext] = None
    config: Optional[AnalysisConfig] = None


class AnalysisStep(BaseModel):
    """Represents a single step in the analysis pipeline"""
    name: str  # e.g., "pattern_check", "rag_retrieval", "llm_judge"
    passed: bool
    duration_ms: int
    details: Optional[Dict[str, Any]] = None


class AnalyzeResponse(BaseModel):
    """Response model for prompt analysis"""
    is_safe: bool
    confidence: float
    processing_time_ms: int
    steps: List[AnalysisStep]

    # Only present if unsafe
    threat_type: Optional[str] = None
    explanation: Optional[str] = None
    violated_policies: Optional[List[str]] = None
    retrieved_documents: Optional[List[Dict[str, Any]]] = None


# ============================================================================
# ENDPOINTS
# ============================================================================

@router.post("/", response_model=AnalyzeResponse)
async def analyze_prompt(request: AnalyzeRequest):
    """
    Analyze a prompt for security threats and policy violations

    This is the main endpoint that:
    1. Validates the prompt length and format
    2. Runs it through the guardrail chain
    3. Returns a detailed analysis

    Args:
        request: AnalyzeRequest containing the prompt and optional context

    Returns:
        AnalyzeResponse with safety verdict and explanation
    """
    start_time = time.time()

    try:
        logger.info(f"Analyzing prompt: {request.prompt[:50]}...")

        # TODO: Implement actual analysis pipeline
        # For now, return a mock response

        # Mock steps
        steps = [
            AnalysisStep(
                name="pattern_check",
                passed=True,
                duration_ms=5,
                details={"patterns_checked": ["sql_injection", "jailbreak"]}
            ),
            AnalysisStep(
                name="rag_retrieval",
                passed=True,
                duration_ms=120,
                details={"documents_found": 3}
            ),
            AnalysisStep(
                name="llm_judge",
                passed=True,
                duration_ms=350,
                details={"model": "gpt-4-turbo-preview"}
            )
        ]

        # Calculate total processing time
        processing_time_ms = int((time.time() - start_time) * 1000)

        # Mock response - SAFE
        return AnalyzeResponse(
            is_safe=True,
            confidence=0.95,
            processing_time_ms=processing_time_ms,
            steps=steps
        )

        # Example UNSAFE response (commented out):
        # return AnalyzeResponse(
        #     is_safe=False,
        #     confidence=0.92,
        #     threat_type="policy_violation",
        #     explanation="This request violates the Data Privacy Policy section 4.2",
        #     violated_policies=["Data Privacy Policy - Section 4.2"],
        #     retrieved_documents=[
        #         {
        #             "source": "Data_Privacy_Policy.pdf",
        #             "section": "4.2",
        #             "content": "Customer email addresses cannot be shared..."
        #         }
        #     ],
        #     processing_time_ms=processing_time_ms,
        #     steps=steps
        # )

    except Exception as e:
        logger.error(f"Error analyzing prompt: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis failed: {str(e)}"
        )


@router.get("/health")
async def health():
    """
    Health check for the analyze service
    """
    return {"status": "healthy", "service": "analyze"}
