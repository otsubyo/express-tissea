from odmantic import Model
from pydantic import EmailStr
from datetime import datetime

class User(Model):
    email: EmailStr
    hashed_password: str
    created_at: datetime = datetime.utcnow()
