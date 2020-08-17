// routes/feedback_routes.js
var ObjectID = require('mongodb').ObjectID;
const sgMail = require('@sendgrid/mail');

module.exports = function(app, db) {
    // post user
    app.post('/emailsubmit', (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: email,
          from: 'helpnemobot@gmail.com', // Use the email address or domain you verified above
          subject: 'Thank you for your solution',
          text: 'Thanks',
          html: `<p>Hi ${name}, <br> We appreciate you sending this solution. We are attaching it for your records. <br><br>All the best,<p>`,
        };
        //ES6
        sgMail
          .send(msg)
          .then(() => {}, error => {
            console.error(error);
        
            if (error.response) {
              console.error(error.response.body)
            }
          });
        //ES8
        (async () => {
          try {
            await sgMail.send(msg);
          } catch (error) {
            console.error(error);
        
            if (error.response) {
              console.error(error.response.body)
            }
          }
        })();
    });
}