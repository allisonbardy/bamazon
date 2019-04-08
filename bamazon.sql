DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("scarf", "women's accessories", 10.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hat", "women's accessories", 5.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blouse", "women's tops", 15.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cardigan", "women's tops", 20.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jeans", "women's bottoms", 25.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skirt", "women's bottoms", 20.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("belt", "women's accessories", 15.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bracelet", "women's jewelry", 8.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ring", "women's jewelry", 5.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bikini", "women's swimwear", 20.00, 100);