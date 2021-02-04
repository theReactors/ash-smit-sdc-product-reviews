DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
\c reviews;


CREATE TABLE IF NOT EXISTS product (
  id SERIAL PRIMARY KEY,
  imageURL VARCHAR,
  color VARCHAR
);

CREATE TABLE IF NOT EXISTS review (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  avatar VARCHAR,
  favorites INT,
  body VARCHAR,
  created DATE,
  productID INT
);
