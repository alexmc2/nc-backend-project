# Northcoders House of Games API

Welcome to my Northcoders board game reviews API! This is the backend component of my solo portfolio project and provides access to board game reviews, review comments, and user data. The server is built using Node.js and Express, with data stored in a PostgreSQL database. It includes comprehensive testing using Jest and Supertest to ensure functionality and reliability.

The API currently offers the following functionality:

- Retrieve a list of game categories and their descriptions.
- Retrieve a list of all reviews or filter reviews by category, sorting them by different criteria such as date or votes.
- Retrieve a specific review by its ID, including the number of comments associated with it.
- Retrieve all comments for a specific review.
- Post a new comment for a specific review.
- Update the vote count for a specific review.
- Delete a comment by its ID.

The API is hosted using the following services:

- Database Hosting: The PostgreSQL database is hosted on ElephantSQL, a managed PostgreSQL database service.
- Server Hosting: The API server is hosted on Render, a cloud platform for hosting and scaling web applications.

**Link to hosted server:** [https://game-reviews-m0nu.onrender.com/api](https://game-reviews-m0nu.onrender.com/api)

## Getting Started

The project requires Node.js version 14.18.1 or higher and PostgresQL version 8.7.1 or higher.

To get started with the project, follow the steps below:

1. **Clone the Repository:** Start by cloning the project repository from GitHub. Open your terminal and run the command `git clone https://github.com/alexmc2/nc-backend-project` to create a local copy of the project on your machine.

2. **Install Dependencies:** Ensure that you have Node.js and npm installed. Navigate to the project's root folder in your terminal and run the command `npm install`. This will install the following dependencies:
   - PostgresQL
   - dotenv
   - Express
   - Jest
   - Supertest

3. **Configure Environment Variables:** Create two new files in the root folder called `.env.test` and `.env.development`. These files will store environment-specific configuration variables. In each file, set the `PGDATABASE` variable to the name of the respective database you want to use (e.g., `PGDATABASE=nc_games_test` for the test database and `PGDATABASE=nc_games` for the development database).

4. **Set Up the Database:** Run the command `npm run seed` to set up the database and populate it with initial data. Make sure to run this command twice to create, drop, and create the database again. This step ensures that the server has the required data to function properly.

5. **Running Tests:** After seeding the database, run the test suite by executing the command `npm run test` in the terminal. This command will run the tests and display the results in the terminal, providing descriptions of what each test is checking for in the server's behavior.
