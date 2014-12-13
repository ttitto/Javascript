define([], function () {
    var Baas = (function () {
        function Baas() {
            // TODO: constructor
        }

        Baas.prototype.getHeaders = function getHeaders() {
            return {
                'X-Parse-Application-Id': 'LLDa4DoMJVizyR3DKDGyefIENv1fIdls6ZMr5Cad',
                'X-Parse-REST-API-Key': 'esU0K1YIg7FuERXurKzzG81CnM39gc5warzqGO3i'
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