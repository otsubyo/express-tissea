from odmantic import Model
from typing import Optional
from pydantic import Field

class Stop(Model):
    name: str
    latitude: float = Field(ge=-90.0, le=90.0)
    longitude: float = Field(ge=-180.0, le=180.0)
