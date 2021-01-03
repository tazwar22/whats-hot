from flask import Flask,jsonify,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/hello')
def say_hello_world():
    return {'result': "Hello World"}

@app.route('/api/cuisines')
def get_cusines():
    data = jsonify([{"id":123, "name":"Trending This Week"},
                    {"id":277, "name":"Mealshare"},
                    {"id":367, "name":"Weekend Brunches"},
                    {"id":444, "name":"Tasty Tacos"},
                    {"id":5, "name":"Heated patio"},
                    {"id":6, "name":"Perfect Poutine"},
                    {"id":7, "name":"Hidden Gems"}])
    return data


@app.route('/api/restaurants')
def get_restaurants():

    query_ID = request.args.get('id')
    print("Getting.. {}".format(query_ID))

    restaurants = [{"id":13, "name":"McDonalds", "positivity":0.98},
                    {"id":27, "name":"A & W", "positivity":0.22},
                    {"id":67, "name":"Five Guys", "positivity":0.32},
                    {"id":4, "name":"Romers", "positivity":0.45},
                    {"id":5, "name":"Finefoods", "positivity":0.66},
                    {"id":6, "name":"Hungry Burgers", "positivity":0.88},
                    {"id":7, "name":"Beetbox", "positivity":0.72}]

    data = jsonify(restaurants)
    return data

    