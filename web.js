var express = require('express');
var childProcess = require('child_process');
var guid = require('guid');
var fs = require('fs');

var app = express();


app.get('/', function(request, response) {

  var filename = './images/' + guid.raw() + '.png';
  var url = request.param('url') || "http://goo.gl/8JV1eB";
  var width = parseInt(request.param('w')) || 800;
  var height = parseInt(request.param('h')) || 600;

  var childArgs = [
    'rasterize.js',
    url,
    filename,
    width, 
    height
  ];

  childProcess.execFile('phantomjs', childArgs, function(error, stdout, stderr){
    if(error !== null)
      return response.json(500, { 'status':  500, 'msg': 'rendering error.' });
    response.sendfile(filename, function(err){
      fs.unlink(filename);
    });
  });


});


var port = process.env.PORT || 5000; 
app.listen(port, function() {
  console.log("prevurl v0");
  console.log("listening on port:", port);
});
