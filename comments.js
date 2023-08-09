// create web server
// run server: node comments.js
// test: http://localhost:3000/comments

// load modules
var http = require('http');
var url = require('url');
var fs = require('fs');

// create server
http.createServer(function(request, response) {
    // parse the pathname
    var pathname = url.parse(request.url).pathname;
    // print pathname
    console.log("Request for " + pathname + " received.");
    // read the requested file content from file system
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            // Page found
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            response.writeHead(200, {'Content-Type': 'text/html'});
            // write the content of the file to response body
            response.write(data.toString());
        }
        // send the response body
        response.end();
    });
}).listen(3000);

// print message to console
console.log('Server running at http://localhost:3000/comments');