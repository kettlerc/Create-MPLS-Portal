# CREATE-MPLS

## Description

Duration: Built in a 2 week sprint.

This project is a administration program for Create MPLS to manage their students, teachers, volunteers, and programs between locations. The goal of it being a record holder for all their needed info for grants so that spreadsheets can go to the way side. 

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)

## Screen Shot

![Project Flowchart Diagram](public/creatempls_diagram.png?raw=true)

### Prerequisites

Just Node.js is required to use this application. The other options are required if you want to do database work or have your systems setup the way we had it.

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)


## Installation

1. Head to database.sql and follow the info in green text. The database is setup in Postgres and we used Postico to run the queries. our database should be very simple to set up just typing a few lines in the console and making sure you have Postico up. (If you don't need the database for your work skip this step).
2. Open up your editor of choice and run an `npm install` (This will get all the dependencies for the program)
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

Teacher Version
1. Register to make a new account and input the given registration code.
2. Log in and you are taken to a screen which has all the provided classes that a teacher has been assigned to. 
3. Click on the class you wish to take attendance for.
4. a screen displays the students in your class and you may select them as well as input the length of the class. 
5. Hitting submit takes you back to the home screen and sends off your attendance to the database.
6. Repeat steps 3-5 throughout your day.
7. Log out or close the app to be signed out. 

Admin Version
1. Register to make a new account and input the given registration code.
2. Log in and you are taken to the dashboard where it should be showing some graphs and some data grids. This contains all the data inside the database. If nothing is showing up that means the database is not properly connected. At the bottom of the page there should be 2 entry fields this is where you can edit the codes for regisration.
3. At the top there will be a Students tab. On the Students Page you can add a student 
4. There will also be a Programs Tab You can create programs, Edit existing programs, add students that are in the database to said programs, as well as add a teacher or staff member. Note you can only add teachers to programs admins do not show up. 
5. Logging out will take you out of the application.


## Built With

CSS
HTML
JavaScript
REACT
REDUX
SAGAS
Node.js

## Directory Structure

- `src/` contains the React application
    - `components/` contains all our various pages
- `public/` contains static assets for the client-side
- `server/` contains the Express App
    - `server.js/` contains all the server info
    - `routes/` contains all the database queries
- `database.sql/` contains the database tables and info needed to start said database.

This code is also commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes.

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) for creating this application with one of their student group projects.
