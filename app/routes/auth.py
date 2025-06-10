from fastapi import APIRouter, HTTPException, Depends
from odmantic import ObjectId
from app.schemas.user import UserCreate, UserLogin, UserOut
from app.models.user import User
from app.database import engine
from app.utils.auth import hash_password, verify_password, create_access_token
from datetime import timedelta

router = APIRouter()

@router.post("/signup", response_model=UserOut)
async def signup(user: UserCreate):
    existing_user = await engine.find_one(User, User.email == user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = hash_password(user.password)
    new_user = User(email=user.email, hashed_password=hashed_pw)
    await engine.save(new_user)
    return new_user

@router.post("/login")
async def login(user: UserLogin):
    db_user = await engine.find_one(User, User.email == user.email)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": str(db_user.id)}, expires_delta=timedelta(minutes=60))
    return {"access_token": token, "token_type": "bearer"}
