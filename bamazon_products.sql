DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100)  NULL,
  department_name VARCHAR(100)  NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(11) NOT NULL,
  PRIMARY KEY (item_id)
  
);
  INSERT INTO 
  products
  VALUES
    (1, 'sneakers', 'shoes', 19.99, 20),
    (2, 'polo shirt', 'clothing', 12.99, 100),
    (3, 'pants', 'clothing', 15.99, 50),
    (4, 'boots', 'shoes', 39.99, 50),
    (5, 'ultra laptop', 'electronics', 96000.5, 5),
    (6, 'kind-of-okay laptop', 'electronics', 20, 10),
    (7, 'Killer Klowns From Outer Space: Dan Deluxe Edition', 'electronics', 9001, 1),
    (8, 'kid laptop', 'electronics', 40, 40),
    (9, 'iPhone One-Trillion', 'electronics', 55500000, 2),
    (10, 'Cheese Pizza', 'grocery', 20, 851462);
