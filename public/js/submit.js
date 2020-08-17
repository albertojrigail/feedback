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
    let imageUrl = "";


    // Get solution code
    const solution = editor.session.getValue().split('\n');
     // Set HTML for code snippet
     let htmlCode = '<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?lang=py&amp;skin=sunburst"></script>' + 
     '<div style="margin:auto;"><pre class="prettyprint">';
     solution.forEach(line => {
         htmlCode += line + '<br/>';
     });
     htmlCode += '</pre></div>';

    const json = {
        html: htmlCode,
        css: ""
    };
    const username = "ca2e9be6-9728-4f7b-a46c-1cdce4bc0676";
    const password = "f32f2ad1-7ac7-48bc-8e51-4bab98348502";

    $.ajax({
        url: 'https://hcti.io/v1/image',
        type: 'post',
        data: JSON.stringify(json),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(username + ":" + password)
        },
        success: function(data) {
            // image url
            const json = JSON.parse(JSON.stringify(data));
            imageUrl = json["url"];

            // solution data
            const solutionData = {
                "solution" : solution,
                "uid" : userId,
                "pid" : problemId,
            }
        
            // post solution in database
            $.ajax({
                url:'/solution',
                type:'post',
                data: solutionData,
        
                success:function(){

                    // send email
                    const emailData = {
                        email: email,
                        name: name,
                        url: imageUrl,
                    }
                    console.log(emailData);
                    $.ajax({
                        url: '/emailsubmit',
                        type: 'get',
                        data: emailData,
                        success: function(data) {
                            console.log(data);
                            console.log("email submitted!");
                        }
                    });
        
                    // go to feedback page
                    window.open("http://34.96.245.124:2999/pages/feedback/feedback.html");
                }
            });
        }
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

// }

// function email() {
    
// }

