// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.get("/public/courses", function (request, response) {
  response.sendFile(__dirname + '/public/courses.html');
});

app.get("/public/faculty", function (request, response) {
  response.sendFile(__dirname + '/public/faculty.html');
});

app.get("/public/SU", function (request, response) {
  response.sendFile(__dirname + '/public/SU.html');
});

app.get("/public/Notekeeper", function (request, response) {
  response.sendFile(__dirname + '/public/Notekeeper.html');
});

app.get("/public/table", function (request, response) {
  response.sendFile(__dirname + '/public/table.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
