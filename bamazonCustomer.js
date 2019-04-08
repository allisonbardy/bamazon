// packages to install
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function start() {
  console.log("Searching products...\n");
  connection.query("SELECT * \n FROM products", function(err, res) {
    if (err) throw err;
    // for loop to console log each item's information in database
    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id + " *",
                  "Product: " + res[i].product_name + " *",
                  "Department: " + res[i].department_name + " *",
                  "Price: " + "$" + res[i].price + " *",
                  "Inventory: " + res[i].stock_quantity); " *",
      console.log("----------------------------------------------------------------------------------------------- \n");
    }
    purchase();
  });
};

// function prompting user to enter item id of product they wish to buy and quanitity 
function purchase() {
  inquirer
    .prompt([
      {
        name: "itemId",
        type: "input",
        message: "What is the Item ID of the product you would like to buy?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units would you like to buy?"
      }
    ])
    .then(function(answer) {
          // query the database for all items being auctioned
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
      var chosenItem;
      for (var i = 0; i < res.length; i++) {
        if (res[i].item_id === parseInt(answer.itemId)) {
          chosenItem = res[i];
        }
      }
      if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
        // bid was high enough, so update db, let the user know, and start over
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: (chosenItem.stock_quantity - parseInt(answer.quantity))
            },
            {
              item_id: answer.itemId
            }
          ],
        );
        console.log("_________________________________________________________________________________________\n\n");
        console.log("Thank you for your business! Your total is " + "$" + parseInt(answer.quantity) * chosenItem.price + "\n");
        console.log("_________________________________________________________________________________________\n\n");
        start();
      }
      else {
        //   console log message that item is out of stock
        console.log("_________________________________________________________________________________________\n\n");
        console.log("Sorry, insufficient stock! Please choose another item.");
        console.log("_________________________________________________________________________________________\n\n");
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: 0
            },
            {
              item_id: answer.itemId
            }
          ],
        );
        start();
      }
    });
  });
}
