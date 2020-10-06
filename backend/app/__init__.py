from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restx import Api, Resource
from backend.app.config import DevelopmentConfig

# Define the WSGI application object
app = Flask(__name__)

# Configurations
# TODO make this load from a string
app.config.from_object(DevelopmentConfig())

api = Api(app, title='Abode API', description="Abode's API")
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# import the sub-modules after setting up, since they need the above setup
import backend.app.auth  # nopep8
