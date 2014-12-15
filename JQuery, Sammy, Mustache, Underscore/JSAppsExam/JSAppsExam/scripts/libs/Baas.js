define([], function () {
    var Baas = (function () {
        function Baas() {
            // TODO: constructor
        }

        Baas.prototype.getHeaders = function getHeaders() {
            return {
                'X-Parse-Application-Id': 'etfK7ddxkYyN1tnpDgsUHbja31v4IvwcFetOH8rp',
                'X-Parse-REST-API-Key': 'Nowkn1vslYOa0nNGXOZuEODVvPFTvNW3Z0IgzuQO'
                //'X-Parse-Session-Token': getSessionToken()
            };
        };

        Baas.prototype.getUrl = function getUrl() {
            return 'https://api.parse.com/1/';
        };

        Baas.prototype.getAcl = function getAcl(userId) {
            return '{ "*":{"read":true}, "' + userId + '":{"write":true,"read":true}}';
        };

        Baas.prototype.getWhereString = function getWhereString(colName, className, classId) {
            return '?where={"' + colName + '":{"__type":"Pointer","className":"' + className + '","objectId":"' + classId + '"}}';
        };

        Baas.prototype.getPointerString = function (className, id) {
            return '{"__type":"Pointer","className":"' + className + '","objectId":"' + id + '"}';
        };

        return Baas;
    }());
    return Baas;
})
;