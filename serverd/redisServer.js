var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var app = express();
var request = require('request');
app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname,'../client')));
var redis = require('redis'),
    client = redis.createClient();







app.listen(4568, () =>{console.log('listening on 4568')});

