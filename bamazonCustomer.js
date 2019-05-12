"use strict";
var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: ",./jkl890",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].item_id + "|" +
                "Product: " + res[i].product_name + "|" +
                "Department: " + res[i].department_name + "|" +
                "Price: " + "$" + res[i].price + "|" +
                "Inventory: " + res[i].stock_quantity);
            console.log("--------------------------------------------------------------------------------");
        }
        makePurchase();
    });

};