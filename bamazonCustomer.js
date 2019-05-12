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
            console.log("Product ID: " + res[i].item_id + " || " +
                "Item: " + res[i].product_name + " || " +
                "Department: " + res[i].department_name + " || " +
                "Price: " + "$" + res[i].price + " || " +
                "Inventory: " + res[i].stock_quantity);
            console.log("___________________________________________________________________________________________________________________________________");
         }
        makePurchase();
    });
};
var makePurchase = function () {
    inquirer.prompt([{
        name: "itemId",
        type: "input",
        message: "Enter Product ID Number:"
    }, {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"
    }]).then(function (answer) {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            var product;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(answer.itemId)) {
                    product = res[i];
                }
            }
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(answer.itemId)) {
                    product = res[i];
                }
            }
            if (product.stock_quantity > parseInt(answer.quantity)) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{
                            stock_quantity: (product.stock_quantity - parseInt(answer.quantity))
                        },
                        {
                            item_id: product.item_id
                        }
                    ],
                    function (error) {
                        if (error) throw error;
                        console.log("Your total is " + "$" + parseInt(answer.quantity) * product.price + ". Thanks for overpaying, and come again!");
                    }
                );
            } else {
                console.log("Not enough inventory to sell at the moment.");
            }
        });
    });
};