"""
LLM-Shield: Dynamic RAG Security Gateway
Main FastAPI application entry point

This file initializes the FastAPI app, sets up middleware, CORS, and routes.
It's the entry point for the entire backend system.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from app.api.router import api_router
from app.core.config import settings

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="LLM-Shield API",
    description="Dynamic RAG Security Gateway for LLM Input Validation",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS (Cross-Origin Resource Sharing)
# Allows the React frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,  # e.g., ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    """
    Root endpoint - health check
    Returns basic API information
    """
    return {
        "message": "LLM-Shield API is running",
        "version": "0.1.0",
        "status": "healthy"
    }


@app.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring
    Used by Docker, Kubernetes, AWS health checks
    """
    return {"status": "healthy"}


@app.on_event("startup")
async def startup_event():
    """
    Runs when the application starts
    Initialize connections to Vector DB, Redis, etc.
    """
    logger.info("Starting LLM-Shield API...")
    logger.info(f"Environment: {settings.ENVIRONMENT}")

    # TODO: Initialize Vector DB connection
    # TODO: Initialize Redis connection
    # TODO: Load any cached data or models


@app.on_event("shutdown")
async def shutdown_event():
    """
    Runs when the application shuts down
    Clean up connections and resources
    """
    logger.info("Shutting down LLM-Shield API...")

    # TODO: Close Vector DB connection
    # TODO: Close Redis connection


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
