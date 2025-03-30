
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
import pickle
import numpy as np

app = Flask(__name__)

# Load Model
try:
    with open("model.pkl", "rb") as model_file:
        model = pickle.load(model_file)
    print("Model loaded successfully!")
except FileNotFoundError:
    model = None
    print("No valid model found!")

@app.route("/predict", methods=["POST"])
def predict_price():
    data = request.json

    if not model:
        return jsonify({"message": "Model not found", "predictedPrice": 0}), 500

    # Prepare input for the model
    input_data = np.array([
        int(data["packageSelect"] == "Premium"),
        int(data["packageSelect"] == "Luxury"),
        int(data["numberOfGuests"])
    ]).reshape(1, -1)

    # Predict price
    predicted_price = model.predict(input_data)[0]

    return jsonify({"predictedPrice": predicted_price}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Running Flask on port 5000
