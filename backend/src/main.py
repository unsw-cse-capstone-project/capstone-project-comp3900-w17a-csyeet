from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware
from .controllers import auth

app = FastAPI(title='Abode API')

app.add_middleware(DBSessionMiddleware,
                   db_url='postgresql://postgres:password@localhost:5432/abode')  # maybe import from config in future (also update alembic.ini)

app.include_router(auth.router, prefix='/auth', tags=['auth'])
