var Profile = require("./profile.js");
var renderer = require('./renderer');
var queryString = require('querystring');

var commonHeaders = {'Content-Type': 'text/html'};

// 2. Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
    // if url == '/' && GET
    if(request.url === '/'){
        if(request.method.toLowerCase() === "get"){
            // show search field
            response.writeHead(200, commonHeaders);
            renderer.view('header', {}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        } else {
            // if url == '/' && POST
            if(request.method.toLowerCase() === 'post') {
                // get the post data from body
                request.on('data', function (postBody) {
                    // extract the username
                    var query = queryString.parse(postBody.toString());
                    response.writeHead(303, {"Location" : '/' + query.username});
                    response.end();
                    // redirect to /:username
                });
            }
        }

    }
}

// 3. Handle http route for GET /:username i.e. /jimmyghelani
function user(request, response) {
    // if url == '/...'
    var username = request.url.replace('/', '');
    if(username.length > 0) {
        response.writeHead(200, commonHeaders);
        renderer.view('header', {}, response);

        // get json from treehouse
        var studentProfile = new Profile(username);

        // on 'end'
        studentProfile.on("end", function (profileJSON) {
            // show profile

            // store values which we need
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }
            // simple response
            renderer.view('profile', values, response);
            renderer.view('footer', {}, response);
            response.end();
        });

        // on 'error'
        studentProfile.on("error", function (error) {
            // show error
            renderer.view('error', {errorMessage: error.message}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        });
    }
}

module.exports.home = home;
module.exports.user = user;