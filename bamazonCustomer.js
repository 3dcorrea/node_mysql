var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table3');

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
    connection.query("SELECT * FROM bamazon.products", function (err, data) {
        console.log(data);
    });
    
    table = new Table({
        head: ['TH 1 label', 'TH 2 label', 'TH 3 label', ]
      , colWidths: [100, 200]
    });
   
//     inquirer
//         .prompt({
//             name: "action",
//             type: "rawlist",
//             message: "What is the item ID of the product you would like to buy?",
//             choices: [
//                 "1: sneakers",
//                 "2: polo shirt",
//                 "3: pants",
//                 "4: boots",
//                 "5: ultra laptop",
//                 "6: kind-of-okay laptop",
//                 "7: Killer Klowns From Outer Space- Dan Deluxe Edition",
//                 "8: kid laptop",
//                 "9: iPhone One-Trillion",
//                 "10: Cheese Pizza"
//             ]
//         })

//         .then(function (answer) {
//             switch (answer.action) {
//                 case "1: sneakers",
//                 "2: polo shirt",
//                 "3: pants",
//                 "4: boots",
//                 "5: ultra laptop",
//                 "6: kind-of-okay laptop",
//                 "7: Killer Klowns From Outer Space- Dan Deluxe Edition",
//                 "8: kid laptop",
//                 "9: iPhone One-Trillion",
//                 "10: Cheese Pizza":
//                     artistSearch();
//                     break;

//                 case "Find all artists who appear more than once":
//                     multiSearch();
//                     break;

//                 case "Find data within a specific range":
//                     rangeSearch();
//                     break;

//                 case "Search for a specific song":
//                     songSearch();
//                     break;

//                 case "exit":
//                     connection.end();
//                     break;
//             }
//         })
};


function artistSearch() {
    inquirer
        .prompt({
            name: "artist",
            type: "input",
            message: "What artist would you like to search for?"
        })
        .then(function (answer) {
            var query = "SELECT position, song, year FROM top5000 WHERE ?";
            connection.query(query, {
                artist: answer.artist
            }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
                }
                runSearch();
            });
        });
}

function multiSearch() {
    var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].artist);
        }
        runSearch();
    });
}

function rangeSearch() {
    inquirer
        .prompt([{
                name: "start",
                type: "input",
                message: "Enter starting position: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "end",
                type: "input",
                message: "Enter ending position: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
            connection.query(query, [answer.start, answer.end], function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        "Position: " +
                        res[i].position +
                        " || Song: " +
                        res[i].song +
                        " || Artist: " +
                        res[i].artist +
                        " || Year: " +
                        res[i].year
                    );
                }
                runSearch();
            });
        });
}

function songSearch() {
    inquirer
        .prompt({
            name: "song",
            type: "input",
            message: "What song would you like to look for?"
        })
        .then(function (answer) {
            console.log(answer.song);
            connection.query("SELECT * FROM top5000 WHERE ?", {
                song: answer.song
            }, function (err, res) {
                console.log(
                    "Position: " +
                    res[0].position +
                    " || Song: " +
                    res[0].song +
                    " || Artist: " +
                    res[0].artist +
                    " || Year: " +
                    res[0].year
                );
                runSearch();
            });
        });
}