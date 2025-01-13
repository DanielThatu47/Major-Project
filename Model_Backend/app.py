from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
from model import fetch_data, preprocess_data, train_model, save_model
import requests
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

MODEL_DIR = 'models'
MAIN_BACKEND_URL = 'http://localhost:5000/api/predictions/add'  # Adjust based on your backend's actual URL

load_dotenv()  # Load environment variables

def load_model(symbol):
    """
    Load the pre-trained model for a given symbol.
    """
    model_path = os.path.join(MODEL_DIR, f'xgboost_model_{symbol}.joblib')
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model for symbol {symbol} not found.")
    model = joblib.load(model_path)
    return model

def search_symbol(query):
    """
    Search for a stock symbol based on user input (symbol or name).
    Returns the symbol if found, else raises an error.
    """
    api_key = os.getenv('TWELVE_DATA_API_KEY')  # Ensure this is set in your .env file
    if not api_key:
        raise ValueError("Twelve Data API key not configured.")

    # Use Twelve Data's SYMBOL_SEARCH endpoint to find matching symbols
    search_url = 'https://api.twelvedata.com/symbol_search'
    params = {
        'symbol': query,
        'exchange': 'NSE,BSE',
        'type': 'stock',
        'apikey': api_key
    }

    response = requests.get(search_url, params=params)
    data = response.json()

    if 'data' not in data:
        raise ValueError(data.get('message', 'No matching symbols found.'))

    # Return the first matched symbol
    return data['data'][0]['symbol'] if data['data'] else None

@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint to handle prediction requests.
    """
    data = request.get_json()
    if not data or 'symbol' not in data:
        return jsonify({'success': False, 'message': 'Symbol is required.'}), 400

    user_input = data['symbol']
    try:
        # Search and validate the symbol
        symbol = search_symbol(user_input)
        if not symbol:
            return jsonify({'success': False, 'message': 'Invalid stock symbol or name.'}), 404

        # Check if the model exists; if not, train and save it
        model_path = os.path.join(MODEL_DIR, f'xgboost_model_{symbol}.joblib')
        if not os.path.exists(model_path):
            # Fetch data for training
            training_data = fetch_data(symbol)
            X_train, y_train = preprocess_data(training_data)
            # Train model
            model = train_model(X_train, y_train)
            # Save model
            save_model(model, symbol)

        # Load the model
        model = load_model(symbol)

        # Fetch the latest data for prediction
        df = fetch_data(symbol, start_date="2023-01-01", end_date="2023-10-01")  # Adjust dates as needed
        X, _ = preprocess_data(df)
        latest_features = X.iloc[-1].values.reshape(1, -1)
        prediction = model.predict(latest_features)[0]
        prediction = round(prediction, 2)

        # Save prediction to main backend
        token = os.getenv('BACKEND_API_TOKEN')  # Use environment variable for security

        if not token:
            return jsonify({'success': False, 'message': 'Backend API token not configured.'}), 500

        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        }
        payload = {
            'symbol': symbol,
            'predictedPrice': prediction
        }
        response = requests.post(MAIN_BACKEND_URL, json=payload, headers=headers)

        if response.status_code == 200:
            return jsonify({'success': True, 'symbol': symbol, 'predicted_price': prediction, 'message': 'Prediction saved successfully.'})
        else:
            return jsonify({'success': False, 'message': 'Prediction made, but failed to save to backend.'}), 500
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
