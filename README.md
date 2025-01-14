

# Welcome to StockBuddy project

# Project info

StockBuddy is a comprehensive and interactive stock market prediction application designed to provide users with a seamless experience. The application integrates a modern frontend built with **Vite, React, ShadCN-UI, and Tailwind CSS**, a robust backend powered by **Node.js with Express and MongoDB**, and a **Flask-based machine learning model** for stock predictions.

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:


# 1. Front end Setup (Vite)
```markdown
```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/DanielThatu47/Major-Project.git

# Step 2: Navigate to the project directory.
cd Major-Project

# Step 3: Navigate to the frontend directory.
cd StockMarketPrediction

# Step 4: Install the necessary dependencies.
npm i

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```



## Set Up environment Variables 
### Step 1: create a .env file in your StockMarketPrediction folder and include following
```markdown
TWELVE_DATA_API_KEY=include your api key here
VITE_NEWS_API_KEY=include your api key here
VITE_ALPHA_VANTAGE_API_KEY=include your api key here
VITE_TWELVE_DATA_API_KEY=${TWELVE_DATA_API_KEY}
REACT_APP_PREDICT_URL=http://localhost:5000
REACT_APP_PREDICTIONS_API_URL=http://localhost:5000

```

# 2. Backend Setup (Node.js , MongoDB & Express.js)
```sh
# Step 1: Navigate to the backend directory.
cd Backend

# Step 2: Install the necessary dependencies.
npm i

# Step 3: Set up environment variables (create a .env file and add necessary variables).
Follow below given steps for environment variables setup for the backend directory

# Step 4: Start the backend server.
npm run dev
```

###  create a .env file in your Backend folder and include following
```markdown
MONGO_URI=include your api key here
JWT_SECRET=include your json web token
PORT=5000
NODE_ENV=development
TWELVE_DATA_API_KEY=include your api key here

```

# 3. Machine Learning Model (Flask)
```sh
# Step 1: Navigate to the ML model directory.
cd Model_Backend

# Step 2: Create a virtual environment and activate it.
python3 -m venv venv
source venv/bin/activate

# Step 3: Install the necessary dependencies.
pip install -r requirements.txt

# Step 4: Run the Flask server.
flask run
```
## What technologies are used for this project?

This project is built with:

- Vite
- React
- shadcn-ui
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- Flask

Feel free to contribute and enhance the project further. If you encounter any issues or have questions, please open an issue on the repository.
```

This updated README.md file includes specific commands for setting up and running the frontend, backend, and machine learning model.
