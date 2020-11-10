from fastapi import FastAPI
from dotenv import load_dotenv
load_dotenv()  # environment variables must be loaded before controllers
from .controllers import auth, listings, recommendations, registration, user  # nopep8
from .helpers import initialise_ML_model  # nopep8

app = FastAPI(title='Abode API')


app.on_event('startup')(initialise_ML_model)


app.include_router(auth.router, tags=['authentication'])
app.include_router(registration.router,
                   prefix='/registrations', tags=['registrations'])
app.include_router(listings.router, prefix='/listings', tags=['listings'])
app.include_router(user.router, prefix='/users', tags=['users'])
app.include_router(recommendations.router,
                   prefix='/recommendations', tags=['recommendations'])
