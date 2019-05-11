USE bamazon;

SET NAMES utf8 ;

DROP TABLE IF EXISTS products;
CREATE TABLE products
(
  item_id int(11) NOT NULL
  AUTO_INCREMENT,
  product_name varchar
  (50) DEFAULT NULL,
  department_name varchar
  (20) DEFAULT NULL,
  price float DEFAULT NULL,
  stock_quantity int
  (11) DEFAULT NULL,
  PRIMARY KEY
  (item_id)
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
