var rest = require('rest');
var defaultRequest = require('rest/interceptor/defaultRequest');
var mime = require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');
var baseRegistry = require('rest/mime/registry');

var registry = baseRegistry.child();
registry.register('application/x-www-form-urlencoded', require('rest/mime/type/application/x-www-form-urlencoded'));
registry.register('application/json', require('rest/mime/type/application/json'));

module.exports = rest
    .wrap(mime, {registry: registry})
    .wrap(errorCode)
    .wrap(defaultRequest, {
        headers: {
            'Accept': 'application/json, text/plain, */*'
        }
    });