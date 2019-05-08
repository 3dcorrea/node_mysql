var mysql = require("mysql");
var inquirer = require("inquirer");

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
    console.log("----------------------------------------------------");
    console.log("Items for sale:");
    console.log("Product ID || Item || Price");
    console.log("1 || sneakers || price: $19.99");
    console.log("2 || polo shirt || price: $12.99");
    console.log("3 || pants|| price: $15.99");
    console.log("4 || boots ||  price: $39.99");
    console.log("5 || ultra laptop || price: $96,000.00");
    console.log("6 || kind-of-okay laptop || price $20.00");
    console.log("7 || Killer Klowns From Outer Space- Dan Deluxe Edition || price: $9,001.00");
    console.log("8 || kid laptop || Price: $40.00");
    console.log("9 || iPhone One-Trillion || price: $55,500,000");
    console.log("10|| Cheese || price: $2.00")
    console.log("----------------------------------------------------");
    inquirer
        .prompt({
            name: "action",
            type: "input",
            message: "What is the item you would like to buy?",
            choices: [{
                    key: 1,
                    value: "sneakers"
                },
                {
                    key: 2,
                    value: "polo shirt"
                },
                {
                    key: 3,
                    value: "pants"
                },
                {
                    key: 4,
                    value: "boots"
                },
                {
                    key: 5,
                    value: "ultra laptop"
                },
                {
                    key: 6,
                    value: "kind-of-okay laptop"
                },
                {
                    key: 7,
                    value: "Killer Klowns From Outer Space- Dan Deluxe Edition"
                },
                {
                    key: 8,
                    value: "kid laptop"
                },
                {
                    key: 9,
                    value: "iPhone One-Trillion"
                },
                {
                    key: 10,
                    value: "Cheese"
                },
            ]
        })

        .then(function (answer) {
            switch (answer.action) {
                case "Find songs by artist":
                    artistSearch();
                    break;

                case "Find all artists who appear more than once":
                    multiSearch();
                    break;

                case "Find data within a specific range":
                    rangeSearch();
                    break;

                case "Search for a specific song":
                    songSearch();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        })
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