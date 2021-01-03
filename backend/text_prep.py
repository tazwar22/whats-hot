import os
import numpy as np
import json
import re
from nltk.stem.porter import PorterStemmer
from gensim.models import Word2Vec
import time

#Paths
root = os.getcwd()
model_num = 50


'''
Preprocessing function
PARAMETERS:
    1) Text
RETURNS:
    - Text with only alphabets
'''
def keep_alphabets(text):
    text = re.sub('[^a-zA-Z]'," ",text) 
    return text


'''
Preprocessing function
PARAMETERS:
    1) Text
RETURNS:
    - Lowercase Text
'''
def conv_to_lower(text):
    return text.lower()


'''
Preprocessing function
PARAMETERS:
    1) Text
RETURNS:
    - Sentence with Stemmed Words
'''
def remove_sw_and_stem(text):
     #Split review into a list
    text = text.split()
    
    #Initialize Stemmer object
    ps = PorterStemmer()
    
    #Filter out stopwords and carry out Stemming
    text = [ps.stem(word) for word in text]
    
    #Join into one string
    text = ' '.join(text)
    del ps
    
    return text


'''
Preprocessing function
PARAMETERS:
    1) Text
RETURNS:
    - Text split into Tokens
'''
def tokenize(text):
    return text.split()


'''
Preprocessing function
PARAMETERS:
    1) DataFrame of processed reviews
RETURNS:
    - DataFrame of processed reviews
'''
def clean_df(df):

    df['text'] = df['text'].apply(keep_alphabets)
    df['text'] = df['text'].apply(conv_to_lower)
    df['text'] = df['text'].apply(remove_sw_and_stem)
    df['text'] = df['text'].apply(tokenize)
    
    return df

'''
Forms Matrix of WordEmbedding Vectors and STANDARDIZES it
PARAMETERS:
    1) DataFrame of processed reviews
    2) StandardScaler
    3) Word2Vec model
RETURNS:
    - X - WordEmbedding vectors
'''
def form_pred_matrix(df, scaler, w2vec):
    
    X = np.zeros((len(df), model_num))
    all_reviews = df.text.values

    for i in range(len(all_reviews)):
        rev = all_reviews[i]
        
        #HANDLE empty case
        if len(rev) == 0:
            continue
        
        #Convert each word ONLY if it is in Vocab and not an empty review
        arr = np.array([w2vec[word] for word in rev if word in w2vec.wv.vocab])
        #Get mean vector
        arr = np.mean(arr, axis=0).reshape(1,-1)

        X[i, :] = arr
      
    #Standardize
    X = scaler.transform(X)
    
    return X


'''
Update DataFrame with prediction
PARAMETERS:
    1) DataFrame of processed reviews to append to
    2) X - WordEmbedding vectors
    3) Fitted Classifier
RETURNS:
    - DataFrame of processed reviews with Prediction Results
'''
def update_prediction(df, X, clf):

    df['sentiment'] = clf.predict(X)
    df['prob_like'] = clf.predict_proba(X)[:, 1]
    
    return df
       


