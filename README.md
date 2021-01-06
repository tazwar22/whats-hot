# Whats-Hot? :fire:

Find the most popular restaurants in Vancouver (BC) according to recent customer reviews, with 1 click!

Video Demo: [YouTube link](https://youtu.be/nf7CQ-JcSOk)

### Technical Features

1. The app obtains real-time data from the Zomato API to get local cuisines and restaurants
2. For a given cuisine, it returns a **top 10** list of restaurants with the most positive feedback based on _sentiment_ in customer reviews
3. The app performs the necessary (aforementioned) computations by using an **L2-regularized Logistic Regression** model (trained and tested on **1 Million** Restaurant Reviews from the Yelp dataset)
4. The model assigns a probabilistic **positivity score (%)** for each restaurant, where a higher value indicates more positive customer feedback

### Sources of Data

- [Yelp](https://www.kaggle.com/yelp-dataset/yelp-dataset?select=yelp_academic_dataset_review.json) - to train and validate the Machine Learning model
- [Zomato API](https://developers.zomato.com/api) - to implement realtime inference features as described above
