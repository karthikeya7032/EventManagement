import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblibs

# Load the dataset (Make sure the file path is correct)
file_path = r"C:\Users\gango\Downloads\Cast\wedding_cost_dataset.xlsx"  # Use 'r' to avoid Unicode escape issues
df = pd.read_excel(file_path)

# Check column names (Ensure correct spelling)
print("Dataset Columns:", df.columns)

# Rename columns if needed
df.rename(columns={'Guest_Count': 'Guests'}, inplace=True)  # Ensure consistency

# Encode the Package column to numeric values
label_encoder = LabelEncoder()
df['Package'] = label_encoder.fit_transform(df['Package'])  # Convert Basic, Premium, Luxury to 0, 1, 2

# Features and Target
X = df[['Guests', 'Package']].values  # Features: Guests & Package (Encoded)
y = df['Cost'].values  # Target: Cost

# Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = LinearRegression()
model.fit(X_train, y_train)

# Save Model & Label Encoder
joblib.dump(model, 'wedding_cost_model.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')

print("✅ Model trained and saved successfully!")
