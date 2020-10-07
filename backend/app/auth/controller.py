from flask_restx import Resource
from backend.app import api, app, db
from backend.app.models import User
from flask import request


@api.route('/auth')
class Auth(Resource):
    # example code
    def get(self):
        return User.query.get(1).name

    # example request:
    # curl -d '{"email":"bob@google.com", "password":"pword", "name":"Bob Jones"}' -X POST localhost:5000/auth -H "Content-Type: application/json"
    def post(self):
        db.session.add(
            User(email=request.json['email'], password=request.json['password'], name=request.json['name']))
        db.session.commit()
        return f"Saved {request.json}"
