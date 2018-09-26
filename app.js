// Problem: we need a simple way to look at a user badge count and javascript points from a web browser
// Solution: user node.js to perform profile lookup and serve templates via HTTP

// Require routes
var router = require('./router.js');

// Plan:
// 1. Create Web server
var http = require('http');
http.createServer(function(request, response){
    router.home(request, response);
    router.user(request, response);
    // response.end('Hello World\n');
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1/');
