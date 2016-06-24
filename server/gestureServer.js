var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var app = express();
var request = require('request');
app.use(bodyparser.json());

app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname,'../client')));


app.post('/gest', (req, res) => {
  console.log(req.body);
});


app.listen(8000, () => {console.log('listening on 8000');});