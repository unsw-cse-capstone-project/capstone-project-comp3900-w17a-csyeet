from flask_restx import Resource
from backend.app import api, app, db
from backend.app.models import Listing
from flask import request
from flask import jsonify
import json

@api.route('/listing')
class Listings(Resource):

    def get(self):
        id = request.json['id']
        listing = Listing.query.get(id)
        return listing.title

    def post(self):
        print(request.json)
        db.session.add(
            Listing(
                owner_id = request.json['owner_id'],
                type = request.json['type'],
                title = request.json['title'],
                description = request.json['description'],
                street = request.json['street'],
                suburb = request.json['suburb'],
                postcode = request.json['postcode'],
                state = request.json['state'],
                country = request.json['country'],
                num_bedrooms = request.json['num_bedrooms'],
                num_bathrooms = request.json['num_bathrooms'],
                num_car_spaces = request.json['num_car_spaces'],
                auction_start = request.json['auction_start'],
                auction_end = request.json['auction_end'],
                has_ensuite = request.json['has_ensuite'],
                has_built_in_wardrobe = request.json['has_built_in_wardrobe'],
                has_bathtub = request.json['has_bathtub'],
                is_furnished = request.json['is_furnished'],
                has_open_kitchen = request.json['has_open_kitchen'],
                has_separate_kitchen = request.json['has_separate_kitchen'],
                has_island_kitchen = request.json['has_island_kitchen'],
                has_gas_stove = request.json['has_gas_stove'],
                has_electric_stove = request.json['has_electric_stove'],
                has_induction_stove = request.json['has_induction_stove'],
                has_balcony = request.json['has_balcony'],
                has_ocean_view = request.json['has_ocean_view'],
                has_bbq = request.json['has_bbq'],
                has_porch = request.json['has_porch'],
                has_pool = request.json['has_pool'],
                has_gym = request.json['has_gym']
            )
        )
        db.session.commit()
        return f"Saved {request.json['title']}"
        