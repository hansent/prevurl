var system = require('system');


var address = system.args[1];
var output = system.args[2];
var width = parseInt(system.args[3]);
var height = parseInt(system.args[4]);


var page = require('webpage').create();
page.settings.resourceTimeout = 1000;

page.viewportSize = { 
    width: width, 
    height: height 
};

page.clipRect = { 
    top: 0, 
    left: 0,
    width: width,
    height: height
};

page.open(address, function (status) {
    
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit();
        return process.exit(1)
    }
    
    page.render(output);
    phantom.exit();
        
});

