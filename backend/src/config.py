import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config():
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:password@localhost:5432/abode'


class TestingConfig(Config):
    TESTING = True
