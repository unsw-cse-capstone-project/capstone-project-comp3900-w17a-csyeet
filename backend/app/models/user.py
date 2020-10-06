from flask_login import UserMixin
from backend.app import db


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f"<User: {self.name}>"
