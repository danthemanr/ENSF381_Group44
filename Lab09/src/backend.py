from flask import Flask, render_template, request, jsonify, make_response
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

@app.route('/validate_login', methods=['GET', 'OPTIONS', 'POST'])
def validate_login():
    users = {
        'alice': 'password123',
        'bob': 'secure456',
        'charlie': 'qwerty789',
        'diana': 'hunter2',
        'eve': 'passpass',
        'frank': 'letmein',
        'grace': 'trustno1',
        'heidi': 'admin123',
        'ivan': 'welcome1',
        'judy': 'password1',
    }
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response, 204
    elif request.method == 'GET':
        return jsonify(users)
    data = request.get_json()
    if users[data['username']] == data['password']:
        response = jsonify({'success':True, 'msg':'login successful'})
    else:
        response = jsonify({'success':False, 'msg':'incorrect username or password'})
    response.headers.add["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers.add["Access-Control-Allow-Credentials"] = "true"
    return response

@app.route('/predict_house_price', methods=['OPTIONS', 'POST'])
def predict_house_price():
    if request.method == 'OPTIONS':
        response = jsonify({"message": "CORS preflight passed"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response, 204
    model = joblib.load("./random_forest_model.pkl")
    data = request.json
    cats = True if 'pets' in data and data['pets'] else False
    dogs = True if 'pets' in data and data['pets'] else False
    sample_data = [
        data['city'],
        data['province'],
        float(data['latitude']),
        float(data['longitude']),
        data['lease_term'],
        data['type'],
        float(data['beds']),
        float(data['baths']),
        float(data['sq_feet']),
        data['furnishing'],
        data['smoking'],
        cats,
        dogs
    ]
    sample_df = pd.DataFrame([sample_data], columns=[
    'city', 'province', 'latitude', 'longitude', 'lease_term',
    'type', 'beds', 'baths', 'sq_feet', 'furnishing',
    'smoking', 'cats', 'dogs'
    ])
    predicted_price = model.predict(sample_df)
    return jsonify({"predicted_price": float(predicted_price[0])})

if __name__ == "__main__":
    app.run(debug=True)