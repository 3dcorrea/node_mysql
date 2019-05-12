# Bamazon

## Overview

In this activity, we were asked to create an online shopping storefront app using MySQL, node.js, and the inquirer npm package. This app prompts the user to enter the ID Number of the product that they'd like to buy, and asks them how many units they'd like to purchase. Based on the inventory table stored in MySQL, if there are enough of the customer's chosen item in stock, they will be given a message thanking them for their business and the total cost. If not, they will be given a message stating that there are not enough items in stock.

## Application

This application demonstrates the basic functionality of any online shopping storefront by taking in user data and carrying out transactions based on inventory information stored in a database. 

This application works by retrieving and updating data in MySQL. 
* First, I created an inventory table in my 'bamazon' database in MySQL
* Then, I needed to establish a connection to that database, which would them allow me to access that data through queries.
* Inquirer then prompted the user to indicate the product and the quantity that they'd like to purchase.
* If the quantity was not greater than the current stock, I needed to run a query, and use an UPDATE statment to change the stock quantity of the selected item in MySQL after a purchase was made. 
* The total cost of the transaction was based on the price of the item stored in MySQL and the quantity from user input. 
