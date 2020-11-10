from fastapi_utils.session import FastAPISessionMaker

session_maker = FastAPISessionMaker(
    'postgresql://postgres:password@localhost:5432/abode')  # TODO: maybe import from config in future (also update alembic.ini)


def get_session(): yield from session_maker.get_db()
