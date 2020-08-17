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
        const html = 
        `
        <div style="font-family:Helvetica; margin:auto; padding:10px; width:50%; font-size:18px;">
          <img src="https://scontent.fgye1-1.fna.fbcdn.net/v/t1.0-9/21462804_454173964983017_6687516315042798755_n.png?_nc_cat=109&_nc_sid=09cbfe&_nc_eui2=AeGmFxkclf5NFTyqd7dp8mJy-2oPuVthUuL7ag-5W2FS4kFxKluA9OCyYjdfnyDBEc-rAclGDL4SYl2zSG6acBC9&_nc_ohc=uJkvuS8rJ40AX__pFeX&_nc_ht=scontent.fgye1-1.fna&oh=97222b38fe0820d53ccfdbed5306413d&oe=5F600FB6" style="height:100px;">
          <br>
          <p>Hi ${name},<br>
          <br>
          We appreciate you sending this solution. Refer to this link to view a snippet of your answer:<br>
          <a href="${url}">your solution</a>
          <br><br><br>
          All the very best,<p>
          <strong>Nemo Bot Team🤖</strong>
        </div>`;
        
        // body
        const msg = {
          to: email,
          from: 'helpnemobot@gmail.com', // Use the email address or domain you verified above
          subject: 'Thank you for your solution ⚡️',
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