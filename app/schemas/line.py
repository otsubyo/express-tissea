from typing import List
from pydantic import BaseModel
from datetime import time

from app.schemas.stop import StopOut

class LineCreate(BaseModel):
    name: str
    category_id: str
    created_at: str  # format YYYY-MM-DD
    start_time: time
    end_time: time

class LineUpdate(BaseModel):
    name: str
    start_time: time
    end_time: time

class LineOut(BaseModel):
    id: str
    name: str
    created_at: str
    start_time: time
    end_time: time
    stops: List[StopOut]
