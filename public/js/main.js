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
const url = 'https://api.hackerearth.com/v3/code/run/';
const client_secret = '4e2dcb22721612358088677edb732d3dedf4af8d';

$('.btn').click(function() {
    
    const script = editor.getValue();
    const data = {
        'client_secret' : client_secret,
        'async' : 0,
        'source' : script,
        'lang' : 'PYTHON',
        'time_limit' : 5,
        'memory_limit' : 262144
    };

    let xhr = new XMLHttpRequest();
    let json = JSON.stringify(data);
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);

    xhr.onload = function() {
        if (xhr.status != 200) { // HTTP error?
          // handle error
          alert( 'Error: ' + xhr.status);
          return;
        }
      
        // get the response from xhr.response
        let json = JSON.parse(JSON.stringify(xhr.response));

        // compile status
        compileStatus = json['compile_status'];

        if (compileStatus === 'OK') {
            console.log("Compilation successful!");
            runStatus = json['run_status'];

            // outputs
            let stderr = runStatus['stderr'];
            let sdtout = runStatus['output']
            let outputHtml = runStatus['output_html'];

            // metrics
            let memoryUsed = runStatus['memory_used'];
            let timeUsed = runStatus['time_used'];

        } else {
            console.log("Compilation unsuccessful");
        }
    };
});