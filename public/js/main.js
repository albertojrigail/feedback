/*--------------------------------------------------------*/
/* This file contains JS configuration for:
/     1. The ace code editor
/     2. The search parameters for the index.html page
/     3. Code for compiling and running programs
/*--------------------------------------------------------*/

// 1. Code editor configuration
var theme='ace/theme/cobalt';
var mode='ace/mode/python';
var editor= ace.edit('ace-editorid');
editor.setTheme(theme);
editor.getSession().setMode(mode);

// Set editor text
var solution = '#---------------------------\n# Write your solution below\n';
editor.session.setValue(solution);  


// 2. Parameters configuration
let searchParams = new URLSearchParams(window.location.search);

// user id
if (searchParams.has('uid')){
    userId = searchParams.get('uid');
    $('.greeting').text('Hey ' + userId + '!');
} else $('.greeting').text('Hey Coder!');

// problem
if(searchParams.has('pid')) {
    var problemId = searchParams.get('pid');
    $.get( 'http://34.96.245.124:2999/problem/' + problemId, function( data ) {
        // Query data
        let json = JSON.parse(JSON.stringify(data));
        let title = json['title'];
        let prompt = json['prompt'];
        let solutionTemplate = json['solution_template'];

        // set title
        $('.title').text("Solve the Following Puzzle: " + title);

        // Set problem text
        let problem = '<div>';
        prompt.forEach(paragraph => {
        problem += '<p>' + paragraph + '</p>';
        });
        problem += '</div>';
        document.querySelector('.problem').innerHTML  = problem; 

        // set new editor text
        solutionTemplate.forEach(line => {
        solution += line + '\n';
        });
        editor.session.setValue(solution);
    });	
}	

// 3. Compiler


$('.btn').click(function() {
    postData();

    
    //     // get the response from xhr.response
    //     let json = JSON.parse(JSON.stringify(xhr.response));

    //     // compile status
    //     compileStatus = json['compile_status'];

    //     if (compileStatus === 'OK') {
    //         console.log("Compilation successful!");
    //         runStatus = json['run_status'];

    //         // outputs
    //         let stderr = runStatus['stderr'];
    //         let sdtout = runStatus['output']
    //         let outputHtml = runStatus['output_html'];

    //         // metrics
    //         let memoryUsed = runStatus['memory_used'];
    //         let timeUsed = runStatus['time_used'];

    //     } else {
    //         console.log("Compilation unsuccessful");
    //     }
    // };
});

// Example POST method implementation:
async function postData() {
    // constants
    const url = 'https://api.hackerearth.com/v3/code/run/';
    const clientSecret = '4e2dcb22721612358088677edb732d3dedf4af8d';

    // form data
    var formData = {
        'client_secret': clientSecret,
        'async': 0,
        'source': "print('Hello, World!')",
        'lang': 'PYTHON',
        'time_limit': 5,
        'memory_limit': 262144
    };

    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(formData) // body data type must match "Content-Type" header
    });
    console.log(response.json());
    return response.json(); // parses JSON response into native JavaScript objects
  }