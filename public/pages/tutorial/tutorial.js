/*--------------------------------------------------------*/
/* This file contains JS configuration for the tutorial page:
/     1. The ace code editor
/     2. The search parameters for the index.html page
/     3. Code for compiling and running programs
/*--------------------------------------------------------*/

// global variables
var editor= ace.edit('ace-editorid'); // code editor

// 1. Code editor configuration
var theme='ace/theme/cobalt';
var mode='ace/mode/python';
editor.setTheme(theme);
editor.getSession().setMode(mode);

// solution
var solution =
    "#-------------------------------\n" +
    "# Write your solution below\n" + 
    "class Solution(object):\n" +
    "    def destCity(self, paths):\n" + 
    "        '''\n" + 
    "        :type paths: List[List[str]]\n" + 
    "        :rtype: str\n" +
    "        '''\n" +
    "        s = set(p[0] for p in paths)\n" +                   
    "        for p in paths:\n" + 
    "            if p[1] not in s:\n" +                        
    "                return p[1]\n" +
    "# Testing:\n" +
    "instance = Solution()\n" +
    'paths = [["London","New York"],["New York","Lima"],\n' +
    '["Lima","Sao Paulo"]]\n' +
    "dest = instance.destCity(paths)\n" +
    "print(dest) # stdout = Sao Paulo\n";
editor.session.setValue(solution);  

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

