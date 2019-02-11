const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// connection configurations
const mc = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodeapi"
});

// connect to database
mc.connect();
// default route

// Retrieve all todos
app.get("/users", function(req, res) {
  mc.query("SELECT * FROM users", function(error, results, fields) {
    if (error) throw error;
    return res.send({ data: results, message: "Todos list." });
  });
});

// Add a new user
app.post("/user", function(req, res) {
  let name = req.body.name;
  let age = req.body.age;

  if (!name || !age) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide name and age" });
  }

  mc.query("INSERT INTO users SET ? ", { name: name, age: age }, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "New task has been created successfully."
    });
  });
});
//  Delete todo
app.delete("/user", function(req, res) {
  let id = req.body.id;

  if (!id) {
    return res.status(400).send({ error: true, message: "Please provide id" });
  }
  mc.query("Delete from users  id = ?", [id], function(error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Task has deleted successfully."
    });
  });
});
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(8080, function() {
  console.log("Node app is running on port 8080");
});
