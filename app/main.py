# app/main.py

from fastapi import FastAPI
from app.database import connect_to_mongo
from app.routes import auth, lines, stats, categories

app = FastAPI(
    title="API Tisséa",
    version="1.0.0"
)

@app.on_event("startup")
async def startup_db():
    await connect_to_mongo()

# Inclusion des routes
app.include_router(auth.router, prefix="/api/users", tags=["Users"])
app.include_router(lines.router, prefix="/api/lines", tags=["Lines"])
app.include_router(stats.router, prefix="/api/stats", tags=["Stats"])
app.include_router(categories.router, prefix="/api/categories", tags=["Categories"])
