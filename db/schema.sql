-- Use the database
USE ecommerce_db;

-- Create the Category table
CREATE TABLE Category (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL
);

-- Create the Product table
CREATE TABLE Product (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 10,
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES Category(id)
);

-- Create the Tag table
CREATE TABLE Tag (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  tag_name VARCHAR(50)
);

-- Create the ProductTag table for many-to-many relationship
CREATE TABLE ProductTag (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  product_id INTEGER,
  tag_id INTEGER,
  FOREIGN KEY (product_id) REFERENCES Product(id),
  FOREIGN KEY (tag_id) REFERENCES Tag(id)
);
