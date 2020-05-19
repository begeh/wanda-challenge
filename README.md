# EXPERT SEARCH

Look for experts on a topic by searching the headings on their personal websites. 

## Getting Started

First, run "npm install" in the project directory to install dependencies.

Then, enter the src folder and start the server by running the command:

### `node server.js`

To start app, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Database

Data is stored locally in a JSON file (db.json) in the src folder using LowDB. The database is reset with default values each time the server is started. To have the database persist after stopping the server, comment out or remove Line 15 of db.js in the src folder where it says "reset();".

## APIs Used

- Rebrandly: https://developers.rebrandly.com/docs/create-a-new-link

### Dependencies
- Express
- React Router
- React Bootstrap
- Body Parser
- LowDB
- Nightmare