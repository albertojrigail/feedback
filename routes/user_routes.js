// routes/feedback_routes.js
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    // GET (pass id after problem: e.g. /problem/10129399)
    app.get('/user/:id', (req, res) => {
        const details = { 'id': req.params.id };
        db.collection('user').findOne(details, (err, item) => {
            if (err) {res.send({'Error':'An error has occurred'});}
            else {res.send(item);}
        });
    });

    // post user
    app.post('/user', (req, res) => {
        const user = {
            name: req.body.name,
            id: req.body.id,
            email: req.body.email,
        }
        db.collection('user').insertOne(user, (err, result) => {
            if(err) {
                res.send({'Error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
}