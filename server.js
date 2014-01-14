var express = require('express');
var app = express();
var dynoImage = require('./lib/dynoImage');
app.use(express.static(__dirname + '/public'));
app.listen(3001);

app.post('/dynoImage' , function(req, res) {
     req.socket.setTimeout(2 * 60 * 1000); // 2 minute timeout
  req.socket.addListener('timeout', function() {
    req.socket.destroy();
  });
    dynoImage.dynoImage(function(ret) {
        
        res.end(ret);
    });
});
