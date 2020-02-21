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
/*
var server = app.listen(3000, function () {
    var host = server.address().address;
    //var port = process.env.PORT || 5000;
    var port = server.address().port;
    //
    /* eslint-disable no-console*/
    //console.log("Example app listening at http://%s:%s", host, port)
    /* eslint-enable no-console*/
//});
/*

app.listen(port);


/*
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = process.env.PORT || 5000;
   // var port = server.address().port;
    //
    /* eslint-disable no-console
    console.log("Example app listening at http://%s:%s", host, port)
    /* eslint-enable no-console
});
*/

