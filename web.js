 var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
 var fileContent =  fs.readFileSync('index.html');
	response.send(fileContent.toString());
});

app.get('/css/:id', function(req, res) {
  res.sendfile(__dirname + '/css/' + req.params.id);
});

app.get('/js/:id', function(req, res) {
  res.sendfile(__dirname + '/js/' + req.params.id);
});

app.get('/less/:id', function(req, res) {
  res.sendfile(__dirname + '/less/' + req.params.id);
});

app.get('/img/:id', function(req, res) {
  res.sendfile(__dirname + '/img/' + req.params.id);
});


app.get('/html/:id' , function(req, res) {
res.sendfile(__dirname + '/html/' + req.params.id);
});
app.get('/font-awesome/:id' , function(req, res) {
res.sendfile(__dirname + '/font-awesome/' + req.params.id);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {


  console.log("Listening on " + port);
});

