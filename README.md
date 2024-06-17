# Data Catalog Web App
Building a B2B Data Catalog for business to view and manage product listings with user authentication.

--------------

# Tech Stack

Primary Language: TypeScript

Frontend: Next.js
Backend: Express.js
Database: PostgreSQL

Hosting / Deployment:
Frontend: Vercel
https://data-catalog-web-am3sabhkd-mukuflash03s-projects.vercel.app/

Backend: Heroku
https://data-catalog-web-app-5161a8376316.herokuapp.com/

--------------

# Instructions to run application locally

1. Clone the GitHub repository
	https://github.com/MukuFlash03/data-catalog-web-app

2. Database setup (Skip)
I’ve used Heroku’s PostgreSQL database add-on since I was hosting my backend on Heroku as well.
To run the application locally, any additional installation is not needed, as all the requests will be made to the Heroku PostgreSQL cloud instance.
I will provide the Database credentials to be stored in the .env file which are used in the code.

3. However, I did install PostgreSQL and Heroku CLI locally to manage the Database via the Terminal command line for operations like Creating the tables initially, Deleting entries, Selecting entries.
I will add information at the end on how to set the database access locally.

Create a .env file in backend/ directory and enter the values.

4. Navigate to the backend directory and install the node modules:
$ cd backend
$ npm install

5. Navigate to the frontend directory and install the node modules:
$ cd frontend
$ npm install

6. Switch to the backend directory and run this command to start the server:
	$ npm run dev


7. Switch to the frontend directory and run this command to start the client:
    $ npm run dev

8. Access the frontend client on the link given in the command output. 
Ideally should be http://localhost:3000 (unless any other process is running on port 3000 already).

--------------

# Dataset

Sample Dataset

%  {
%    "id": 1,
%    "product name": "Firm Graphics",
%    "data category": "Firmographic",
%    "Record count": 5250,
%    "fields": ["Company name","Company address","Website"]
%  },


Dataset Generation

I generated the data using ChatGPT based on the sample data.
I added the product_name field to the data since the requirements mentioned that products should be searchable by product_name but the sample data did not have the product_name field.

Dataset Loading
I wrote a Python script to load the product data into the database.

--------------


# Database Schema

Tables: data_entries, users

Commands to Create Tables:

-- For auto-generating UUIDs 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  
CREATE TABLE users ( _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL );

CREATE TABLE data_entries ( _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, id INTEGER, product_name TEXT, data_category TEXT, record_count INTEGER, fields TEXT[]);

-----------