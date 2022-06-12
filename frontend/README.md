# My Cocktails party!

### `ABOUT PROJECT`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The application displays a list of possible cocktails that could be served to friends. There is an inventory or ingredients page to manage ingredients by adding a new ingredient or editing an ingredient or deleting an ingredient.
In cocktails page, it displays a list of cocktails and it's ingredients required to be prepared.
- If all ingredients are present for a particular cocktail, it is displayed as 'can be prepared'  
- If some of the ingredients are absent for a particular cocktail, it is displayed as 'cannot be prepared'

## Steps to run project

In the project directory, you can run:

### `npm install` on frontend folder

Navigate to frontend folder and run npm install to install required packages

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Other Details

### `create-react-app`
Application is built from scratch using command `npx create-react-app frontend --template typescript

### `react-bootstap`
- react-bootstap is used for styling and layout.
- Simple UI is designed as per the task assignment
- Responsive UI is achieved using react-bootstrap and SASS

### `API data`
The application is fetching data from API https://us-central1-nexible-code.cloudfunctions.net/ 

### `Testing`
Test cases are not included due to time constraint

### `Local Storage`
Browser local storage is used for state management