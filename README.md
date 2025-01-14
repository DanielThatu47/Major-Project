

# Welcome to StockBuddy project

# Project info

StockBuddy is a comprehensive and interactive stock market prediction application designed to provide users with a seamless experience. The application integrates a modern frontend built with **Vite, React, ShadCN-UI, and Tailwind CSS**, a robust backend powered by **Node.js with Express and MongoDB**, and a **Flask-based machine learning model** for stock predictions.

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:


# Front end Setup (Vite)
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
### Step 1: create a .env file and include following
```markdown
VITE_TWELVE_DATA_API_KEY = your_VITE_TWELVE_DATA_API_KEY_key

```

### Backend Setup (Node.js & Express.js)
```sh
# Step 1: Navigate to the backend directory.
cd Backend

# Step 2: Install the necessary dependencies.
npm i

# Step 3: Set up environment variables (create a .env file and add necessary variables).

# Step 4: Start the backend server.
npm start
```

### Machine Learning Model (Flask)
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

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

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