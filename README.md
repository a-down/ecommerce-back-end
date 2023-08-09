# E-Commerce Backend (Module 13 Homework - ORM)

The goal was to create the backend API for an e-commerce site. The requirements were:
- The user can connect to a database with Sequelize when they provide the necessary environment data.
- The user can use schema and seed commands to set up the database with test data.
- The user invokes the application with the command line and the Sequelize models are synced to the database.
- The user can interact with the categories, products, and tags with GET, POST, PUT, and DELETE methods.
- The user can assess the routes with Insomnia to interact with the database.

## Installation

To use the Backend Database, you will need to follow these instructions:
1. Download the project repo to your computer.
2. In command line:
    ```
    npm install
    ```
3. Confirm that ```mysql2```, ```epress```, ```sequelize```, and ```dotenv``` are installed and active.
4. In MySQL Workbench:
    - Copy the code from ```schema.sql``` into Workbench and run the code.
5. In command line:
    ```
    npm run seed
    ``` 
    to seed the database with test data.

## Usage

1. In command line
    ```
    node server.js
    ```
    to start the server on [http://localhost:3001](http://localhost:3001)

2. Connect to [http://localhost:3001](http://localhost:3001) in Insomnia

3. Use Insomnia to Interact with the Database. Below is a list of available routes:
    ```
    GET     /api/categories
    GET     /api/categories/:id
    POST    /api/categories
    PUT     /api/categories/:id
    DELETE  /api/categories/:id
    
    GET     /api/products
    GET     /api/products/:id
    POST    /api/products
    PUT     /api/products/:id
    DELETE  /api/products/:id

    GET     /api/tags
    GET     /api/tags/:id
    POST    /api/tags
    PUT     /api/tags/:id
    DELETE  /api/tags/:id
    ```


## Video Demo

[Link to Demo Video](https://watch.screencastify.com/v/kxhnIpZg1SZFTZUmTNBh)