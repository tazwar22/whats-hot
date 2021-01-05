import json
import requests
import os
import pandas as pd
from config import API_KEY

#Paths/URLs
Key = API_KEY
BASE = "https://developers.zomato.com/api/v2.1/"


'''
Find all categories
PARAMETERS:

RETURNS:
    - All Categories of Restaurants
'''
def get_all_categories():
    url = BASE + "categories"
    r = requests.get(url, headers={'user-key': Key})
    data = None
    if r.ok:
        data = r.json()
    
    return data


'''
Find a city by name and return the ID
PARAMETERS:
    1) City Name
RETURNS:
    - City ID
'''
def get_city(search_name):
    
    url = BASE + "cities?"
    payload = {"q" : search_name}
    r = requests.get(url, headers={'user-key': Key}, params = payload)
    
    data, city_id = None, None
    if r.ok:
        #First suggestion
        data = r.json()['location_suggestions'][0]
        city_id = data['id']
        
    else:
        print(r)
    
    return city_id    


'''
Find a city by name and return the entire collection
PARAMETERS:
    1) City Name
RETURNS:
    - JSON of Collection Stats to form Dict from
'''
def get_city_collections(search_name):
    
    city_id = get_city(search_name)
    
    url = BASE + "collections?"
    payload = {"city_id" : city_id}
    r = requests.get(url, headers={'user-key': Key}, params = payload)
    
    data, city_id = None, None
    if r.ok:
        data = r.json()
    else:
        print(r)
    
    return data



'''
Forms Collection Mapper
PARAMETERS:
    1) Text
RETURNS:
    - Dict which maps "Collection NAME" => Collection ID
    - Dict which maps Collection ID => "Collection NAME"
'''
def form_collection_map(collections):
    id_map, name_map, img_map = {} , {}, {}
    for item in collections['collections']:
        entry = item['collection']
        #Store stats
        idx, name, img_url = entry['collection_id'], entry['title'], entry['image_url']
        id_map[name] = idx
        name_map[idx] = name
        #Store the image URL
        img_map[idx] = img_url

    return id_map, name_map, img_map


'''
Find all restaurants with Given FLAG in Given City (eg. Vancouver)

PARAMETERS:
    1) Name of City
    2) Collection ID (use a mapper)
RETURNS:
    - All Data JSON about restaurants
'''
def search_restaurants(search_name, collection_id):
    
    city_id = get_city(search_name)
    
    url = BASE + "search?"
    payload = {"entity_id" : city_id,
               "entity_type" : "city",
               "collection_id": str(collection_id),
               "count":str(10)}
    r = requests.get(url, headers={'user-key': Key}, params = payload)
    
    data = None
    if r.ok:
        data = r.json()
    else:
        print(r)
    
    return data


'''
Retrieve Restaurant IDs and Names from RESULT of search_restaurants
PARAMETERS:
    1) Restaurants JSON
RETURNS:
    - Restaurant IDX
    - Restaurant Names
'''
def get_res_idx(restaurants):
    
    res_idx = []
    names = []
    image_urls = []

    for res in restaurants['restaurants']:

        res = res['restaurant']
        #Store details
        res_idx.append(res['id'])
        names.append(res['name'])
        image_urls.append(res['featured_image'])
        print(res['featured_image'])
    
    return res_idx, names, image_urls


'''
Gets most-recent 5 reviews for a given Restaurant ID
PARAMETERS:
    1) Restaurant ID
RETURNS:
    - JSON data
'''
def get_reviews(res_id):
    
    url = BASE + "reviews?"
    payload = {"res_id" : res_id}
    r = requests.get(url, headers={'user-key': Key}, params = payload)
    
    data = None
    if r.ok:
        data = r.json()
    else:
        print(r)
    
    return data   


'''
Forms DataFrame of reviews from given data for 1 Restaurant
PARAMETERS:
    1) Text
RETURNS:
    - DataFrame of Restaurants with Reviews
'''
def form_review_df(reviews):
    
    user_reviews  = reviews['user_reviews']
    #Iterate over and collect all NON-empty reviews
    ratings  = [x['review']['rating'] for x in user_reviews]
    rev_texts  = [x['review']['review_text'] for x in user_reviews]

    df = []
    for rating, rev in zip(ratings, rev_texts):
        #Check for empty
        if len(rev) == 0:
            continue
        df.append([rating, rev])

    df = pd.DataFrame(df, columns=['Rating', 'text'])   
    
    return df   
