define(['AjaxRequester'],
    function (AjaxRequester) {
        var DataRepo = (function () {
            function DataRepo(baseUrl) {
                this.baseUrl = baseUrl;
                this.requester = new AjaxRequester();
                this.users = new Users();
            }

            var Baas = (function () {
                function Baas() {
                    // TODO: constructor
                }

                Baas.prototype.getHeaders = function getHeaders() {
                    return {
                        'X-Parse-Application-Id': 'fE3pqGmdD8hKzNe2d1EKTSiarVHdh36uZZuO9nt8',
                        'X-Parse-REST-API-Key': 'Z7ZsZRRkYT5Caq20M3aqBlHZMFL6CQ8JrgnSI4Dc'
                        //'X-Parse-Session-Token': getSessionToken()
                    };
                };

                return Baas;
            }());

            var Users = (function () {
                function Users() {
                    // TODO: constructor
                }

                Users.prototype.register = function register() {
                    this.requester.post()
                };

                return Users;
            }());

            return DataRepo;
        }());

        return DataRepo;
    });