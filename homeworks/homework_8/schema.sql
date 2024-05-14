CREATE DATABASE transaction_db;

CREATE TABLE User (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Transaction (
    id SERIAL PRIMARY KEY,
    amount DECIMAL NOT NULL,
    user_from INT NOT NULL REFERENCES User(id),
    user_to INT NOT NULL REFERENCES User(id)
);