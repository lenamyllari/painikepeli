const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const painikePeliApi = require('./painikePeliApi.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors({
    'allowedHeaders': ['Content-Type'],
    'origin': '*',
    'preflightContinue': true
}));

var path = require('path');
var serveStatic = require('serve-static');
app.use(serveStatic(__dirname + "/dist"));

app.use('/api', painikePeliApi);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


