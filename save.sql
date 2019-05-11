DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    department_name VARCHAR(20),
    item_id INT NOT NULL
    AUTO_INCREMENT,
    price FLOAT,
    product_name VARCHAR(50),
    stock_quantity INT,
    (item_id) PRIMARY KEY
);


