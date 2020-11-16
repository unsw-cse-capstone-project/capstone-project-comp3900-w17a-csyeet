from fastapi_utils.session import FastAPISessionMaker

session_maker = FastAPISessionMaker(
    'postgresql://postgres:password@localhost:5432/abode')


def get_session(): yield from session_maker.get_db()
