"""
API Router
Aggregates all API endpoints into a single router

This file combines all the endpoint routers (analyze, health, etc.)
into one main router that is included in the FastAPI app.
"""

from fastapi import APIRouter
from app.api.endpoints import analyze

# Create main API router
api_router = APIRouter()

# Include endpoint routers
api_router.include_router(
    analyze.router,
    prefix="/analyze",
    tags=["Analysis"]
)

# Future endpoints can be added here:
# api_router.include_router(health.router, prefix="/health", tags=["Health"])
# api_router.include_router(metrics.router, prefix="/metrics", tags=["Metrics"])
