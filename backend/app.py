from flask import Flask,jsonify,request
from flask_cors import CORS
import zomato as zomato
import os
import joblib
from gensim.models import Word2Vec
import text_prep as prep
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

root = os.getcwd()
scaler_path = os.path.join(root, "./models/scaler.pkl")
clf_path = os.path.join(root, "./models/logRegL1.pkl")
model_num = 50
model_path =  os.path.join(root, "./models/word2vec_{}.model".format(model_num))

#Load models
scaler = joblib.load(scaler_path)
clf = joblib.load(clf_path)
w2vec = Word2Vec.load(model_path)
print("Loaded scaler and models")

#Specify City
search_city = "Vancouver"


@app.route('/hello')
def say_hello_world():
    return {'result': "Hello World"}

@app.route('/api/cuisines')
def get_cusines():

    collections = zomato.get_city_collections(search_city)
    id_map, name_map = zomato.form_collection_map(collections)

    response = []
    for idx, name in name_map.items():
        entry = {"id":idx, "name":name}
        response.append(entry)

    return jsonify(response)


@app.route('/api/restaurants')
def get_restaurants():
    #Get the ID
    query_ID = request.args.get('id')
    print("Getting.. {}".format(query_ID))

    restaurants = zomato.search_restaurants(search_city, collection_id = query_ID)
    res_idx, res_names = zomato.get_res_idx(restaurants)

    #Query all restaurants for reviews
    mega_df = []
    for res_id, name in zip(res_idx, res_names):
        #Pass in the restaurant ID
        reviews = zomato.get_reviews(res_id = res_id)

        df = zomato.form_review_df(reviews)
        df = prep.clean_df(df)
        Xtilde = prep.form_pred_matrix(df, scaler, w2vec)
        #Update with prediction
        df = prep.update_prediction(df, Xtilde, clf)
        positivity = np.round(np.mean(df.prob_like), 2)*100
        
        mega_df.append([res_id, name, positivity, len(df)])
        
    mega_df = pd.DataFrame(mega_df, columns = ["id","name" ,"positivity","num_reviews"]).sort_values('positivity', ascending=False)

    return mega_df.to_json(orient='records')

    