// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static('assets'));

// Reservation (DATA)
// =============================================================
var tables = [{
 	customerName: "Martin",
	phoneNumber: "6786772233",
	customerEmail: "martin@gmail.com",
	partyName: "Ade"
}, {
	customerName: "Karlos",
	phoneNumber: "6786415731",
	customerEmail: "karlos@gmail.com",
	partyName: "Gardner"
}];
 
 // A GET Route to `/` which should display the home page.
 // =============================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
//got to reservations page can add your table
app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});
// view table-shows current reservations and waiting list
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
app.get("/api/tables", function(req, res) {
  // var chosen = req.params.tables;
  //
  // if (chosen) {
  //   console.log(chosen);
  //
  //   for (var i = 0; i < tables.length; i++) {
  //     if (chosen === tables[i].routeName) {
  //      return res.json(tables[i]);
  //     }
  //   }
  //   return res.json(false);
  //   res.send("No table available at this time!");
  // }
  return res.json(tables);
});
//A POST route /api/friends. This will be used to handle incoming survey results. 
//This route will also be used to handle the compatibility logic. 
app.post("/api/reservations", function(req, res) {
  var newtable = req.body;
  newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

  tables.push(newtable);

  res.json(newtable);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
