var express = require('express');
var app = express();


app.use(express.static('../AngularJS'));

app.listen(80);