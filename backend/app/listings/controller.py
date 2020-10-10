from flask_restx import Resource
from backend.app import api, app, db
from backend.app.models import Property
from flask import request

@api.route('/listing')
class Listings(Resource):

    def get(self):
        return Property.query.get(request.json['id'])

    def post(self):
        db.session.add(
            Property(
                owner_id = request.json['owner_id'],
                title = request.json['title'],
                street = request.json['street'],
                suburb = request.json['suburb'],
                postcode = request.json['postcode'],
                state = request.json['state'],
                country = request.json['country'],
                listing_type = request.json['listing_type'],
                num_bedrooms = request.json['num_bedrooms'],
                num_bathrooms = request.json['num_bathrooms'],
                num_car_spaces = request.json['num_car_spaces'],
                auction_start = request.json['auction_start'],
                auction_end = request.json['auction_end'],
                description = request.json['description'],
                features = request.json['features']
            )
        )
        return f"Saved {request.json['title']}"
        