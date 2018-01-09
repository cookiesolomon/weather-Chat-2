var express = require('express');
var app = express();
app.use(express.static('node_modules'));
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.send("hello world");
});



app.use(express.static('node_modules'));
app.listen(8000);  