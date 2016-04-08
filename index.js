var http = require('http');
var https = require('https');
var url = require('url');

var JSVEEPythonJSON = function() {};

JSVEEPythonJSON.addToHead = function(params) {
    return '<script src="/static/jsvee-python/JSVEE-python-min.js" type="text/javascript"></script>\n' +
           '<link href="/static/jsvee-python/jsvee-python.css" rel="stylesheet">\n';
};

JSVEEPythonJSON.addToBody = function(params) {
    return '';
};


JSVEEPythonJSON.initialize = function(req, params, handlers, cb) {

    // Initialize the content package
    params.headContent += JSVEEPythonJSON.addToHead(params);
    params.bodyContent += JSVEEPythonJSON.addToBody(params);

    var initializeAsync = function(req, params, cb) {

        // Helper functions
        var addData = function(data) {
            params.headContent += '<script type="text/javascript">\n' +
                'JSVEE.animations = {};\n' +
                'JSVEE.animations.getAnimation = function (id) { \n' +
                '  return ' + data + ';\n' +
                '};\n' +
                '$(function() {\n' +
                '  $(".jsvee-animation").each(function () {\n' +
                '    var id = $(this).data("id");\n' +
                '    if (id) { new JSVEE.ui(id, this); }\n' +
                '  })\n' +
                '});\n' +
                '</script>';
        };

        var handleResult = function(result) {
            var body = '';
            if (result.statusCode == 200) {
                result.setEncoding('utf8');
                result.on('data', function(chunk) {
                    body += chunk;
                });
                result.on('end', function() {
                    addData(body);
                    cb();
                });
            } else {
                params.error = 'Communication error';
                cb();
            }
        };

        // Get the requested resource
        if (req.query.url) {
            var isHttps = url.parse(req.query.url).protocol === 'https:';
            (isHttps ? https : http).get(req.query.url, function(result) {
                handleResult(result);
            }).on('error', function(e) {
                params.error = 'Communication error';
                cb();
            });

        } else {
            params.error = 'Missing required parameter';
            cb();
        }
    };

    initializeAsync(req, params, cb);

};

JSVEEPythonJSON.register = function(handlers) {
    handlers.contentPackages['jsvee-python-json'] = JSVEEPythonJSON;
    handlers.contentTypes.jsvee.installedContentPackages.push(JSVEEPythonJSON);
};

JSVEEPythonJSON.namespace = 'jsvee-python-json';
JSVEEPythonJSON.contentTypeNamespace = 'jsvee';
JSVEEPythonJSON.packageType = 'content';

JSVEEPythonJSON.meta = {
    'name': 'jsvee-python-json',
    'shortDescription': 'Exercise package for loading external JSVEE animations.',
    'description': '',
    'author': 'Teemu Sirkiä',
    'license': 'MIT',
    'version': '0.0.1',
    'url': '',
    'teaserContent': [],
    'contents': {}
};

module.exports = JSVEEPythonJSON;
