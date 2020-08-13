// routes/feedback_routes.js
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    // GET (pass id after problem: e.g. /problem/10129399)
    app.get('/problem/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('problem').findOne(details, (err, item) => {
            if (err) {res.send({'Error':'An error has occurred'});}
            else {res.send(item);}
        });
    });

    // GET (gets random problem document from the database)
    app.get('/problem', (req, res) => {
        const agg =  db.collection('problem').aggregate([{$sample: {size: 1}}], function(err, result){
            if (err) {res.send({'Error':'An error has occurred'})}
            else {
                getRandomAndSend(result, res);                        
            }
        });
    });

    async function getRandomAndSend (randomCollection, res) {
        var array =  await randomCollection.toArray();
        res.send(array[0]);
    }
}