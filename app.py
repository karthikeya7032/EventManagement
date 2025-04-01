
# from flask import Flask, request, jsonify
# from flask_pymongo import PyMongo
# import pickle
# import numpy as np

# app = Flask(__name__)

# # MongoDB Configuration
# app.config["MONGO_URI"] = "mongodb://localhost:27017/marriage_db"
# mongo = PyMongo(app)

# # Load Model
# try:
#     with open("model.pkl", "rb") as model_file:
#         model = pickle.load(model_file)
#     print("Model loaded successfully!")
# except FileNotFoundError:
#     model = None
#     print("No valid model found!")

# @app.route("/submit-form", methods=["POST"])
# def submit_form():
#     data = request.json

#     # Save form data to MongoDB
#     inserted_id = mongo.db.registrations.insert_one(data).inserted_id

#     if not model:
#         return jsonify({"message": "Model not found", "data": {"registrationId": str(inserted_id)}}), 200

#     # Prepare input for model (ensure you extract relevant features)
#     input_data = np.array([
#         int(data["packageSelect"] == "Premium"),
#         int(data["packageSelect"] == "Luxury"),
#         int(data["numberOfGuests"])
#     ]).reshape(1, -1)

#     # Predict price
#     predicted_price = model.predict(input_data)[0]

#     # Update MongoDB with predicted price
#     mongo.db.registrations.update_one({"_id": inserted_id}, {"$set": {"predictedPrice": predicted_price}})

#     return jsonify({"message": "Registration successful", "data": {"registrationId": str(inserted_id), "predictedPrice": predicted_price}}), 200

# if __name__ == "__main__":
#     app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the model and encoders
try:
    model = joblib.load('wedding_cost_model.pkl')
    label_encoder_religion = joblib.load('religion_encoder.pkl')
    label_encoder_package = joblib.load('package_encoder.pkl')
    print("Model and encoders loaded successfully!")
except FileNotFoundError as e:
    print(f"Error loading model or encoders: {e}")
    model = None
    label_encoder_religion = None
    label_encoder_package = None

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or label_encoder_religion is None or label_encoder_package is None:
        return jsonify({'error': 'Model or encoders not loaded'}), 500

    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON received'}), 400

        if not all(k in data for k in ("religion", "package", "guest_count")):
            return jsonify({'error': 'Missing required fields'}), 400

        religion = data['religion']
        package = data['package']
        guest_count = data['guest_count']

        # Encode the input values
        try:
          encoded_religion = label_encoder_religion.transform([religion])[0]
          encoded_package = label_encoder_package.transform([package])[0]
        except ValueError as e:
            return jsonify({'error': f"Invalid religion or package: {e}"}), 400

        # Prepare input for the model
        input_data = np.array([encoded_religion, encoded_package, guest_count]).reshape(1, -1)

        # Predict the cost
        predicted_cost = model.predict(input_data)[0]

        return jsonify({
            'predicted_cost': float(predicted_cost), #ensure it is json serializable.
            'religion': religion,
            'package': package
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)