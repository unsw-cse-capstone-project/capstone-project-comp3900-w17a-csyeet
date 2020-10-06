from flask_restx import Resource
from backend.app import api, app, db
from backend.app.models import User
from flask import request


@api.route('/auth')
class Auth(Resource):
    # example code
    def get(self):
        return User.query.get(1).name

    def post(self):
        db.session.add(
            User(email=request.json['email'], password=request.json['password'], name=request.json['name']))
        db.session.commit()
        return f"Saved {request.json}"
