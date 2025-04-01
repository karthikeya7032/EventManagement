# import joblib
# import numpy as np

# # Load the model and label encoder
# model = joblib.load('wedding_cost_model.pkl')
# label_encoder = joblib.load('label_encoder.pkl')

# # User input (Modify these values for testing)
# religion = "Hindu"  # Not used in model, but can be for future improvements
# package = "Premium"  # Change between "Basic", "Premium", "Luxury"
# guests = 500  # Number of guests

# # Convert package to encoded value
# package_encoded = label_encoder.transform([package])[0]  

# # Prepare input
# sample_input = np.array([[guests, package_encoded]])

# # Predict cost
# predicted_cost = model.predict(sample_input)

# print(f"🔹 Estimated Wedding Cost: ₹{predicted_cost[0]:,.2f}")
import sys
import json
import joblib

# Load the model and encoders
model = joblib.load('wedding_cost_model.pkl')
religion_encoder = joblib.load('religion_encoder.pkl')
package_encoder = joblib.load('package_encoder.pkl')

# Read input from command line (sent by Express)
input_data = json.loads(sys.argv[1])

# Extract and encode input
religion = religion_encoder.transform([input_data['religion']])[0]
package = package_encoder.transform([input_data['package']])[0]
guest_count = input_data['guest_count']

# Prepare data for prediction
features = [[religion, package, guest_count]]

# Predict cost
predicted_cost = model.predict(features)[0]

# Output prediction as JSON
print(json.dumps({'predicted_cost': predicted_cost}))
