# Marvel Characters App

This is a React-based application that interacts with the Marvel API to display a list of Marvel characters. The app allows users to: 
- View a list of Marvel characters
- Fetch and display a random character
- Load additional characters dynamically 
- View detailed information about a specific character

## Features

- **Random Character**: Get a randomly selected Marvel character and display its details.
- **Character List**: Load and display a paginated list of Marvel characters.
- **Character Details**: Click on a character to view detailed information about them on a separate page.
- **Dynamic Loading**: Load more characters dynamically as you scroll through the list.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Marvel API**: Used to fetch character data from the Marvel database.
- **SCSS**: For styling the components.

## How to Run the Project

1. Clone the repository: `git clone https://github.com/Dok2314/React-Marvel-Characters.git`  
2. Navigate into the project directory: `cd React-Marvel-Characters`  
3. Install the dependencies: `npm install`  
4. Create a `.env` file in the root directory and add your Marvel API keys:  
   `REACT_APP_MARVEL_PUBLIC_KEY=your_public_key`  
   `REACT_APP_MARVEL_PRIVATE_KEY=your_private_key`  
5. Start the development server: `npm start`  
6. Open your browser and visit `http://localhost:3000` to see the app in action.

## Marvel API

The app uses the official [Marvel API](https://developer.marvel.com/) to retrieve character data. Make sure to sign up for an API key on the Marvel Developer portal.
