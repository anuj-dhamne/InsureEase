import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Load dataset
df = pd.read_csv("insurance.csv")

# Convert categorical variables to numerical
df = pd.get_dummies(df, columns=['sex', 'smoker', 'region'], drop_first=True)

# Define features and target
X = df.drop(columns=['charges'])  # Features
y = df['charges']  # Target variable

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "insurance_model.pkl")
print("Model saved successfully!")
