import joblib
import numpy as np

# Load the model and label encoder
model = joblib.load('wedding_cost_model.pkl')
label_encoder = joblib.load('label_encoder.pkl')

# User input (Modify these values for testing)
religion = "Hindu"  # Not used in model, but can be for future improvements
package = "Premium"  # Change between "Basic", "Premium", "Luxury"
guests = 500  # Number of guests

# Convert package to encoded value
package_encoded = label_encoder.transform([package])[0]  

# Prepare input
sample_input = np.array([[guests, package_encoded]])

# Predict cost
predicted_cost = model.predict(sample_input)

print(f"🔹 Estimated Wedding Cost: ₹{predicted_cost[0]:,.2f}")
