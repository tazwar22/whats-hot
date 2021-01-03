from flask import Flask,jsonify
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