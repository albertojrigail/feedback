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
// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) { 
    var mypre = document.getElementById("output"); 
    mypre.innerHTML = mypre.innerHTML + text; 
} 
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() { 
    var prog = editor.getValue();
    var mypre = document.getElementById("output"); 
    mypre.innerHTML = ''; 
    Sk.pre = "output";
    Sk.configure({output:outf, read:builtinRead}); 
    var myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function(mod) {
        console.log('success');
    },
    
    function(err) {
        console.log(err.toString());
        mypre.innerHTML = mypre.innerHTML + err.toString(); 
    });
} 