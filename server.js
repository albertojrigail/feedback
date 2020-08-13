// requirements
const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');
const bodyParser= require('body-parser')

// app and port
const app = express();
const port = 2998;

// enable the 'public' directory
app.use(express.static(__dirname + '/public'));
// enable bodyParser
app.use(bodyParser.urlencoded({ extended: true }))


// connect to database
MongoClient.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) =>{
    var database = database.db('feedback-api');
    app.listen(port, '0.0.0.0', function() {
        console.log("Listening on " + port);
    });
    require('./routes')(app, database);
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });
});