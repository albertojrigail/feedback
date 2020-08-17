// check if user wants to submit solution by showing a popup

function preSubmit() {
    document.getElementById("main-section").style.display= "none";
    document.getElementById("submit-section").style.display = "block";
}

// user goes back to previous page and nothing is submitted
function noSubmit() {
    document.getElementById("main-section").style.display= "block";
    document.getElementById("submit-section").style.display = "none";
}

// submit solution and then go to feedback page
function yesSubmit() {
    let url = "http://34.96.245.124:2999/emailsubmit";
    let name = "Alberto";
    let email = "ajrc@princeton.edu";
    // image link
    let msg = {
        email: email,
        name: name,
    }

    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(msg),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
    });
}

//     var solutionText = editor.session.getValue();
//     var solutionList = solutionText.split('\n');
//     let name = "Coder";
//     let email = "";
//     data = {
//         'uid' : userId,
//         'pid' : problemId,
//         'solution' : solutionList,
//     }
    
//     html = 
//     `<html>
//         <h2>Hi ${name}</h2><br>
//         <p>Thank you for your solution<p>
//         <br></br>
//     </html>`;

//     var data = JSON.stringify({
//         "personalizations": [
//             {
//                 "to": [
//                     {
//                         "email": email,
//                     }
//                 ],
//                 "subject": "Thank you for your Coding Submission"
//             }
//         ],
//         "from": {
//             "email": "helpnemobot@gmail.com"
//         },
//         "content": [
//             {
//                 "type": "text/html",
//                 "value": html,
//             }
//         ]
//     });

//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
//     xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === this.DONE) {
//             console.log(this.responseText);
//         }
//     });
//     xhr.open("POST", "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send");
//     xhr.setRequestHeader("x-rapidapi-host", "rapidprod-sendgrid-v1.p.rapidapi.com");
//     xhr.setRequestHeader("x-rapidapi-key", "fd4045971bmshb20f89cb73be8f1p1836c3jsnb097b061acc3");
//     xhr.setRequestHeader("content-type", "application/json");
//     xhr.setRequestHeader("accept", "application/json");
//     xhr.send(data);

//     // get user information
//     // $.get( 'http://34.96.245.124:2999/user/' + userId, function(data ) {
//     //     // need to register first
//     //     let json = JSON.parse(JSON.stringify(data));
//     //     name = json["name"];
//     //     email = json["email"];
//     // });
//     // $.ajax({
//     //     url:'/solution',
//     //     type:'post',
//     //     data: data,
//     //     success:function(){
//     //         // send email to problem user
//     //         // go to feedback page
//     //         // window.location.replace("http://34.96.245.124:2999/pages/feedback/feedback.html");
//     //     }
//     // });
// }

// function email() {
    
// }

