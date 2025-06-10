from odmantic import Model, Reference
from datetime import time
from typing import List
from app.models.stop import Stop
from app.models.category import Category

class Line(Model):
    name: str
    category: Category = Reference()
    created_at: str  # format YYYY-MM-DD
    start_time: time
    end_time: time
    stops: List[Stop] = []  # ordonnés
