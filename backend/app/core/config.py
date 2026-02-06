"""
Configuration Management
Loads environment variables and application settings using Pydantic

This file contains all the configuration settings for the application.
It uses pydantic-settings to load environment variables with validation.
"""

from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """
    Application settings
    These are loaded from environment variables or .env file
    """

    # Application
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    MAX_PROMPT_LENGTH: int = 4000
    CACHE_TTL: int = 3600  # Cache Time-To-Live in seconds (1 hour)

    # API Keys
    OPENAI_API_KEY: str = ""
    PINECONE_API_KEY: str = ""
    PINECONE_ENV: str = "us-east1-gcp"  # Pinecone environment/region

    # AWS (if using Bedrock)
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "us-east-1"

    # Redis Configuration
    REDIS_URL: str = "redis://localhost:6379"
    REDIS_CACHE_ENABLED: bool = True

    # Vector Database
    VECTOR_DB_TYPE: str = "chroma"  # Options: "chroma", "pinecone"
    CHROMA_PERSIST_DIR: str = "./chroma_db"
    PINECONE_INDEX_NAME: str = "llm-shield-policies"

    # LLM Configuration
    LLM_PROVIDER: str = "openai"  # Options: "openai", "aws-bedrock"
    LLM_MODEL: str = "gpt-4-turbo-preview"
    LLM_TEMPERATURE: float = 0.0  # Low temperature for consistent judgments
    LLM_MAX_TOKENS: int = 500

    # Embeddings
    EMBEDDING_MODEL: str = "text-embedding-3-small"  # OpenAI embedding model

    # RAG Configuration
    RAG_TOP_K: int = 3  # Number of documents to retrieve
    RAG_SCORE_THRESHOLD: float = 0.7  # Minimum similarity score

    # Security Thresholds
    THREAT_CONFIDENCE_THRESHOLD: float = 0.75
    STRICT_MODE: bool = False

    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()
