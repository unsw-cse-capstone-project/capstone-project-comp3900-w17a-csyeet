from dataclasses import asdict
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi_sqlalchemy import db
from ..schemas import CreateRegistrationRequest, RegistrationResponse
from ..models import Registration

router = APIRouter()

@router.post('/', response_model=RegistrationResponse)
def create(req: CreateRegistrationRequest, session: Session = Depends(lambda: db.session)):
    ''' registers a user as a RAB for a listing '''
    registration = Registration(**req.dict())
    session.add(registration)
    session.commit()
    return asdict(registration)
