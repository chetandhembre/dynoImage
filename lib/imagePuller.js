var Q = require('q');
var request = require('request');
var async = require('async');
request = request.defaults({
    encoding: null,
    timeout: 5000
});

var r;

var getData = function (urls) {

    /*var urls = ['https://pbs.twimg.com/profile_images/3461494432/4650acbbdb87be334ca8802198da3f25.jpeg', 'http://pb.twimg.com/profile_images/2679175639/76d1d56462dce2cfe0e111c9cf3db28d_normal.jpeg'];*/
    var request_promise = [];
    urls.forEach(function (url) {
        var deferred = Q.defer();
        request.get(url, function (error, response, body) {
            
            if (!error && response.statusCode == 200) {
                data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                /*console.log(data);*/
                deferred.resolve(data);
                
            } else {
                deferred.resolve(null);
            }
        });
        request_promise.push(deferred.promise);
    });

    return Q.all(request_promise);

};

var getSingleImageData = function(url, callback) {
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
            /*console.log(data);*/
            callback(null, data);
            
        } else {
            callback(null);
        }
    });
};

var fetchImage = function(urls, callback) {
    var imgData = [];
    var promise = getData(urls);
    promise.then(function (results) {
        callback(results);
        
    }).fail(function(err){
        console.log('error in image puller' + err);
    });
    /*async.map(urls, getSingleImageData, function(err, results){
        if(err) {
            console.log(err);
            callback([]);
        }
        
        callback(results);
    });*/
    
};


exports.fetchImage = fetchImage;
exports.get = function() {
    return r;
};