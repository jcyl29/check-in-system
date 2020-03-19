# Visitor check in system
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To test

In the project directory, you can run:

### `yarn install; yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Features
- use css grid for layout
- uses [font awesome](https://fontawesome.com/) for font icons
- uses native `<dialog>` element with help of a polyfill
- uses custom React Hooks (useDebounce)
- use node-sass for SCSS support
- uss memory-cache to cache API requests
- testing for all files using react-testing-library, react-mock-fetch


## User stories addressed:
### Listing visitors
- As an employee
    - When I open the application
    - Then I can see a list of all Cool Chip visitors
        - And I can see each of their first names
        - And I can see each of their last names
        - And I can see each of their signed out statuses    

### Signing out visitors
- As an employee
    - that is viewing the visitors list
- When I click the "Sign out" button for a specific visitor
- Then the visitor is marked as signed out
### Add a new visitor:
- As en employee
    -that is viewing the visitors list
- When I click "Add a new visitor"
    - And I provide the first name of the visitor
    - And I provide the last name of the visitor
    - And I provide the notes about the visitor
    - And I choose to save
- Then I see the new visitor added to the list of all visitors
    - that is not signed out
### Searching visitors
- As en employee
    - And I am viewing the list of visitors
- When I choose to filter by "Signed out"
- Then I only see the visitors who have been signed out