from fastapi_sqlalchemy import db


def get_session(): return db.session
