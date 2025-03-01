from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

# Load trained model
model = joblib.load("insurance_model.pkl")

# Define FastAPI app
app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Change to specific domain in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")  # Root endpoint
def home():
    return {"message": "Welcome to InsureEase Backend!"}

# Define request model
class UserInput(BaseModel):
    age: int
    bmi: float
    sex: str
    smoker: str
    region: str

# Function to recommend policy based on predicted cost
def recommend_policy(predicted_cost):
    if predicted_cost < 5000:
        return "Basic Health Plan"
    elif predicted_cost < 15000:
        return "Comprehensive Plan"
    else:
        return "Premium Plan with Critical Illness Cover"

@app.post("/api/recommend")  # ✅ Fixed missing slash
async def get_recommendation(data: UserInput):
    # Convert input data to model format
    user_data = pd.DataFrame({
        "age": [data.age],
        "bmi": [data.bmi],
        "sex_male": [1 if data.sex.lower() == "male" else 0],
        "smoker_yes": [1 if data.smoker.lower() == "yes" else 0],
        "region_northwest": [1 if data.region.lower() == "northwest" else 0],
        "region_southeast": [1 if data.region.lower() == "southeast" else 0],
        "region_southwest": [1 if data.region.lower() == "southwest" else 0]
    })

    # Predict cost
    predicted_cost = model.predict(user_data)[0]
    policy = recommend_policy(predicted_cost)

    return {
        "predicted_cost": round(predicted_cost, 2),
        "recommended_policy": policy
    }

