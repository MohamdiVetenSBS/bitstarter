#!/usr/bin/env node
var fs = require('fs');
var restler = require('restler');
var program = require('commander');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var URL_DEFAULT = "http://getbootstrap.com/examples/starter-template/";
var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};

var cheerioHtmlFile = function(htmlfile) {return cheerio.load(fs.readFileSync(htmlfile).toString());};

var loadChecks = function(checksfile) {return JSON.parse(fs.readFileSync(checksfile).toString());};

var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
out[checks[ii]] = present;
    }
    return out;
};

var checkURL = function(htmlfile, checksfile) {
    $ = cheerio.load(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
out[checks[ii]] = present;
    }
    return out;
};



var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};
var urlHTML="";
if(require.main == module) {
    program
        .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
        .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
        .option('-u, --url <url_link>', 'Website URL',true, URL_DEFAULT )
        .parse(process.argv);
          
         
           restler.get(program.url).on('complete', function(result, data){
         // console.log("First" + result);

	       urlHTML = result;

	        //  var checkJson = checkHtmlFile(program.file, program.checks);                                                                             
    var checkJsonURL = checkURL(urlHTML, program.checks);
// mofi                                                                                                                                         
    var outJson = JSON.stringify(checkJsonURL, null, 4);
    console.log( outJson);


});
   // var checkJson = checkHtmlFile(program.file, program.checks);
  //  var checkJsonURL = checkURL(urlHTML, program.checks);
// mofi
 //   var outJson = JSON.stringify(checkJsonURL, null, 4);
  //  console.log("Final" + outJson);
} else {
    exports.checkHtmlFile = checkHtmlFile;
    exports.checkURL = checkURL;
   
}
