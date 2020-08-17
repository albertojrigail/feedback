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
    // create code snippet from solution
    imageUrl = createSnippet();
    console.log(imageUrl);
    console.log(name);
    console.log(email);

    const solutionData = {
        "solution" : editor.session.getValue(),
        "uid" : userId,
        "pid" : problemId,
    }

    // post solution in database
    $.ajax({
        url:'/solution',
        type:'post',
        data: solutionData,
        success:function(){
            // send email to problem user
            let name = "Alberto";
            let email = "ajrc@princeton.edu";
            // image link
            const emailData = {
                email: email,
                name: name,
                url: imageUrl,
            }
            $.ajax({
                url: '/emailsubmit',
                type: 'get',
                data: JSON.stringify(emailData),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
            });

            // go to feedback page
            // window.location.replace("http://34.96.245.124:2999/pages/feedback/feedback.html");
        }
    });
}

// Creates code snippet from editor code
function createSnippet() {
    // Get solution code
    const solution = editor.session.getValue();
    template = solution.split('\n');

    // Set HTML for code snippet
    let htmlCode = '<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?lang=py&amp;skin=sunburst"></script>' + 
    '<div style="margin:auto;"><pre class="prettyprint">';
    template.forEach(line => {
        htmlCode += line + '<br/>';
    });
    htmlCode += '</pre></div>';

    // Set parameters for requesting snippets
    const data = {
        html: htmlCode,
        css: "",
        google_fonts: "Roboto"
    }
    
    // Authentication
    const API_ID = "ca2e9be6-9728-4f7b-a46c-1cdce4bc0676";
    const API_KEY= "f32f2ad1-7ac7-48bc-8e51-4bab98348502";
    
    // Create an image by sending a POST to the API.
    $.ajax({
        url: 'https://hcti.io/v1/image',
        type: 'post',
        data: JSON.stringify(data),
        username: API_ID,
        password: API_KEY,
        dataType: 'json',
        success: function(data) {
            let imageUrl = JSON.parse(data)["url"];
            return imageUrl;
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

