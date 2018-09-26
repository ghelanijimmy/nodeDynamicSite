var fs = require('fs');

function mergeValues(values, content){
    // cycle over keys
    for(var key in values){
        // replace all {{key}} with values from values object
        content = content.replace("{{" + key +"}}", values[key]);
    }
    // return merged cocntent
    return content;
}

function view(templateName, values, response){
    // Read from template file
    var fileContents = fs.readFileSync('./views/'+templateName+'.html', {encoding: 'utf8'});
    //Insert values into the content
    fileContents = mergeValues(values, fileContents);
    // Write out the contents to response
    response.write(fileContents);
}

module.exports.view = view;