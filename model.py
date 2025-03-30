from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load("wedding_cost_model.pkl")

# Label encoders for categorical values
label_encoders = {
    "Religion": {"Hindu": 0, "Muslim": 1, "Christian": 2},
    "Package": {"Basic": 0, "Premium": 1, "Luxury": 2}
}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        religion = data.get("religion")
        package = data.get("package")
        guest_count = data.get("guest_count")
        
        if not religion or not package or guest_count is None:
            return jsonify({"error": "Missing required parameters"}), 400
        
        religion_encoded = label_encoders["Religion"].get(religion, -1)
        package_encoded = label_encoders["Package"].get(package, -1)
        
        if religion_encoded == -1 or package_encoded == -1:
            return jsonify({"error": "Invalid religion or package"}), 400
        
        # Create input array
        input_data = np.array([[religion_encoded, package_encoded, guest_count]])
        
        # Predict the cost
        predicted_cost = model.predict(input_data)[0]
        
        return jsonify({"estimated_cost": f"INR {predicted_cost:,.2f}"})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
