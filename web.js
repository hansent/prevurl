var express = require('express');
var childProcess = require('child_process');
var guid = require('guid');
var path = require('path');
var fs = require('fs');

var app = express();
app.use(express.static(__dirname + '/images'));


/*
 * render = function (url, width, height, callback)
 * -------------------------------------------------
 * renders a url with given width and height
 * will return the filename of the rendered output
 * png file ("images/<filename>.png").
 *
 * filename is a generated guid
 * TODO: use md5 of output as filename
 */
var render = function(url, width, height, callback){
  var filename = './images/' + guid.raw() + '.png';
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
    return callback(null, filename);
  });
};



app.get('/', function(request, response) {
  var url = request.param('url') || "http://goo.gl/8JV1eB";
  var width = parseInt(request.param('w')) || 800;
  var height = parseInt(request.param('h')) || 600;

  render(url, width, height, function(err, filename){
    //send image, then delete the generated file
    response.sendfile(filename, function(err){
      fs.unlink(filename);
    });
  });

});



app.get('/save', function(request, response) {
  var url = request.param('url') || "http://goo.gl/8JV1eB";
  var width = parseInt(request.param('w')) || 800;
  var height = parseInt(request.param('h')) || 600;

  render(url, width, height, function(err, filename){
    //redirect to saved image.  since the images 
    //directory is served via express static middleware
    //we just redirect to the basename (without "images/"
    //prefix)
    response.redirect(path.basename(filename));
  });

});



var port = process.env.PORT || 5000; 
app.listen(port, function() {
  console.log("prevurl v0");
  console.log("listening on port:", port);
});
