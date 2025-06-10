from pydantic import BaseModel

class StopOut(BaseModel):
    id: str
    name: str
    latitude: float
    longitude: float
