// routes/feedback_routes.js
var ObjectID = require('mongodb').ObjectID;
const sgMail = require('@sendgrid/mail');

module.exports = function(app, db) {
    // post user
    app.get('/emailsubmit', (req, res) => {
        // query inputs
        const name = req.body.name;
        const email = req.body.email;
        const url = req.body.url;

        // validate inputs
        if(name=== "" || email === "" || url === "") {
          res.send("Invalid inputs.");
        }

        // html email template
        var html = 
        `<p>Hi ${name},<br>
        We appreciate you sending this solution. Refer to this link to view a snippet of your solution:<br>
        <a href="${url}">your solution</a>
        <br><br>
        All the best,<p>`,
        
        // body
        var msg = {
          to: email,
          from: 'helpnemobot@gmail.com', // Use the email address or domain you verified above
          subject: 'Thank you for your solution',
          text: 'Thanks',
          html: html,
        };

        // send email
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        sgMail
        .send(msg, (error, result) => {
          if (error) {
            // Do something with the error
            res.send("Failure...");
          }
          else {
            res.send("Success!");
          }
        });
    });
}