const express = require('express');
const path = require('path');
const app = express();


console.log(path.resolve(__dirname,  '../../dist'));
app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen('8000', () => console.log('listening on 8000'));