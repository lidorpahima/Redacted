"""
Vector Database Service
Handles all interactions with the vector database (Pinecone or ChromaDB)

This service is responsible for:
1. Storing policy documents as embeddings
2. Searching for relevant policies given a user prompt
3. Managing the vector database connection

VECTOR DB OPTIONS:
- Development: ChromaDB (local, no API key needed)
- Production: Pinecone (managed, scalable, requires API key)

WORKFLOW:
1. Policy documents (PDFs, TXTs) are loaded from data/policies/
2. Documents are split into chunks (e.g., 500 tokens each)
3. Each chunk is embedded using an embedding model
4. Embeddings are stored in the vector DB with metadata
5. When a user prompt comes in:
   - Prompt is embedded
   - Vector DB searches for similar embeddings
   - Top K most similar chunks are returned
"""

from typing import List, Dict, Any, Optional
from abc import ABC, abstractmethod
import logging

# TODO: Uncomment when ready to implement
# from langchain.vectorstores import Chroma, Pinecone
# from langchain.embeddings import OpenAIEmbeddings
# from app.core.config import settings

logger = logging.getLogger(__name__)


class VectorDBService(ABC):
    """
    Abstract base class for vector database services
    Allows easy switching between ChromaDB and Pinecone
    """

    @abstractmethod
    async def search(
        self,
        query: str,
        top_k: int = 3,
        score_threshold: float = 0.7
    ) -> List[Dict[str, Any]]:
        """
        Search for documents similar to the query

        Args:
            query: The search query (user's prompt)
            top_k: Number of results to return
            score_threshold: Minimum similarity score (0.0 - 1.0)

        Returns:
            List of documents with metadata
        """
        pass

    @abstractmethod
    async def add_documents(self, documents: List[Dict[str, Any]]) -> bool:
        """
        Add documents to the vector database

        Args:
            documents: List of documents with text and metadata

        Returns:
            Success status
        """
        pass


class ChromaDBService(VectorDBService):
    """
    ChromaDB implementation (for local development)

    ChromaDB is a local vector database that doesn't require an API key.
    Perfect for development and testing.

    Usage:
        db = ChromaDBService()
        await db.initialize()
        results = await db.search("Can I share customer data?")
    """

    def __init__(self, persist_directory: str = "./chroma_db"):
        """
        Initialize ChromaDB service

        Args:
            persist_directory: Where to store the database on disk
        """
        self.persist_directory = persist_directory
        self.collection = None
        logger.info(f"Initializing ChromaDB at {persist_directory}")

    async def initialize(self):
        """
        Initialize the ChromaDB connection and collection

        TODO: Implement
        """
        # TODO: Implement
        # import chromadb
        # from chromadb.utils import embedding_functions
        #
        # self.client = chromadb.Client(Settings(
        #     chroma_db_impl="duckdb+parquet",
        #     persist_directory=self.persist_directory
        # ))
        #
        # # Create or get collection
        # self.collection = self.client.get_or_create_collection(
        #     name="policies",
        #     embedding_function=embedding_functions.OpenAIEmbeddingFunction(
        #         api_key=settings.OPENAI_API_KEY
        #     )
        # )

        logger.info("ChromaDB initialized")

    async def search(
        self,
        query: str,
        top_k: int = 3,
        score_threshold: float = 0.7
    ) -> List[Dict[str, Any]]:
        """
        Search ChromaDB for relevant documents

        TODO: Implement actual search
        """
        logger.info(f"Searching ChromaDB for: {query[:50]}...")

        # TODO: Implement
        # results = self.collection.query(
        #     query_texts=[query],
        #     n_results=top_k,
        #     where={"score": {"$gte": score_threshold}}
        # )
        # return self._format_results(results)

        # Mock response
        return [
            {
                "source": "Data_Privacy_Policy.pdf",
                "section": "4.2",
                "content": "Customer data must not be shared without consent...",
                "score": 0.89
            }
        ]

    async def add_documents(self, documents: List[Dict[str, Any]]) -> bool:
        """
        Add documents to ChromaDB

        Args:
            documents: List of dicts with 'text', 'metadata' keys

        TODO: Implement
        """
        # TODO: Implement
        # texts = [doc["text"] for doc in documents]
        # metadatas = [doc["metadata"] for doc in documents]
        # ids = [f"doc_{i}" for i in range(len(documents))]
        #
        # self.collection.add(
        #     documents=texts,
        #     metadatas=metadatas,
        #     ids=ids
        # )

        logger.info(f"Added {len(documents)} documents to ChromaDB")
        return True


class PineconeService(VectorDBService):
    """
    Pinecone implementation (for production)

    Pinecone is a managed vector database service. It's more scalable
    and production-ready than ChromaDB, but requires an API key.

    Usage:
        db = PineconeService()
        await db.initialize()
        results = await db.search("Can I share customer data?")
    """

    def __init__(self, api_key: str, environment: str, index_name: str):
        """
        Initialize Pinecone service

        Args:
            api_key: Pinecone API key
            environment: Pinecone environment (e.g., "us-east1-gcp")
            index_name: Name of the Pinecone index
        """
        self.api_key = api_key
        self.environment = environment
        self.index_name = index_name
        self.index = None
        logger.info(f"Initializing Pinecone in {environment}")

    async def initialize(self):
        """
        Initialize Pinecone connection

        TODO: Implement
        """
        # TODO: Implement
        # import pinecone
        #
        # pinecone.init(
        #     api_key=self.api_key,
        #     environment=self.environment
        # )
        #
        # # Create index if it doesn't exist
        # if self.index_name not in pinecone.list_indexes():
        #     pinecone.create_index(
        #         name=self.index_name,
        #         dimension=1536,  # OpenAI embedding dimension
        #         metric="cosine"
        #     )
        #
        # self.index = pinecone.Index(self.index_name)

        logger.info("Pinecone initialized")

    async def search(
        self,
        query: str,
        top_k: int = 3,
        score_threshold: float = 0.7
    ) -> List[Dict[str, Any]]:
        """
        Search Pinecone for relevant documents

        TODO: Implement
        """
        logger.info(f"Searching Pinecone for: {query[:50]}...")

        # TODO: Implement
        # # Generate embedding for query
        # query_embedding = await self._embed_text(query)
        #
        # # Search Pinecone
        # results = self.index.query(
        #     vector=query_embedding,
        #     top_k=top_k,
        #     include_metadata=True
        # )
        # return self._format_results(results)

        # Mock response
        return [
            {
                "source": "Data_Privacy_Policy.pdf",
                "section": "4.2",
                "content": "Customer data must not be shared without consent...",
                "score": 0.89
            }
        ]

    async def add_documents(self, documents: List[Dict[str, Any]]) -> bool:
        """
        Add documents to Pinecone

        TODO: Implement
        """
        logger.info(f"Adding {len(documents)} documents to Pinecone")
        return True


# Factory function to get the right DB service
def get_vector_db_service() -> VectorDBService:
    """
    Factory function to create the appropriate vector DB service
    based on configuration

    TODO: Implement based on settings
    """
    # TODO: Implement
    # from app.core.config import settings
    #
    # if settings.VECTOR_DB_TYPE == "chroma":
    #     return ChromaDBService(settings.CHROMA_PERSIST_DIR)
    # elif settings.VECTOR_DB_TYPE == "pinecone":
    #     return PineconeService(
    #         api_key=settings.PINECONE_API_KEY,
    #         environment=settings.PINECONE_ENV,
    #         index_name=settings.PINECONE_INDEX_NAME
    #     )

    # For now, return ChromaDB
    return ChromaDBService()
