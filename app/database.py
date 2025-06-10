# app/database.py

from odmantic import AIOEngine
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGODB_URL, DATABASE_NAME

engine: AIOEngine = None  # défini à l'initialisation


async def connect_to_mongo():
    global engine
    client = AsyncIOMotorClient(MONGODB_URL)
    engine = AIOEngine(motor_client=client, database=DATABASE_NAME)
