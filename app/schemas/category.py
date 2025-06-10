from pydantic import BaseModel

class CategoryOut(BaseModel):
    id: str
    name: str
