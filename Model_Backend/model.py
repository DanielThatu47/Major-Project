import yfinance as yf
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from xgboost import XGBRegressor
import joblib
import os

def fetch_data(symbol, start_date="2015-01-01", end_date="2023-10-01"):
    data = yf.download(symbol, start=start_date, end=end_date)
    if data.empty:
        raise ValueError(f"No data found for symbol: {symbol}")
    data.reset_index(inplace=True)
    return data

def preprocess_data(df):
    df['Date'] = pd.to_datetime(df['Date'])
    df.sort_values('Date', inplace=True)
    df['Target'] = df['Close'].shift(-1)
    df.dropna(inplace=True)
    
    # Feature Engineering
    df['Return'] = df['Close'].pct_change()
    df['MA7'] = df['Close'].rolling(window=7).mean()
    df['MA21'] = df['Close'].rolling(window=21).mean()
    df['STD7'] = df['Close'].rolling(window=7).std()
    df['STD21'] = df['Close'].rolling(window=21).std()
    df.dropna(inplace=True)
    
    features = ['Open', 'High', 'Low', 'Close', 'Volume', 'MA7', 'MA21', 'STD7', 'STD21']
    X = df[features]
    y = df['Target']
    return X, y

def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = XGBRegressor(
        objective='reg:squarederror',
        n_estimators=100,
        learning_rate=0.05,
        max_depth=5,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42
    )
    
    model.fit(
        X_train, 
        y_train, 
        eval_set=[(X_test, y_test)], 
        early_stopping_rounds=10, 
        verbose=False
    )
    
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    print(f"Model trained with MSE: {mse:.4f}")
    
    return model

def save_model(model, symbol):
    if not os.path.exists('models'):
        os.makedirs('models')
    joblib.dump(model, f'models/xgboost_model_{symbol}.joblib')
    print(f"Model saved as models/xgboost_model_{symbol}.joblib")

def main():
    symbols = ['RELIANCE.NS', 'TCS.NS', 'AAPL']  # Add more symbols as needed
    for symbol in symbols:
        print(f"Processing symbol: {symbol}")
        try:
            data = fetch_data(symbol)
            X, y = preprocess_data(data)
            model = train_model(X, y)
            save_model(model, symbol.split('.')[0])  # Save without exchange suffix for 'AAPL'
        except Exception as e:
            print(f"Error processing {symbol}: {e}")

if __name__ == "__main__":
    main()
