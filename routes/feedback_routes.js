// routes/feedback_routes.js
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    
    // POST (pass arguments in 'body')
    app.post('/feedback', (req, res) => {
        const feedback = {
            user: req.body.user,
            title: req.body.title,
            text: req.body.body,
            receiver: req.body.receiver
        }
        db.collection('feedback').insertOne(feedback, (err, result) => {
            if(err) {
                res.send({'Error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    // GET (pass id after feedback: e.g. /feedback/10129399)
    app.get('/feedback/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('feedback').findOne(details, (err, item) => {
            if (err) {res.send({'Error':'An error has occurred'});}
            else {res.send(item);}
        });
    });

    // GET (gets random feedback document from the database)
    app.get('/feedback', (req, res) => {
        const agg =  db.collection('feedback').aggregate([{$sample: {size: 1}}], function(err, result){
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