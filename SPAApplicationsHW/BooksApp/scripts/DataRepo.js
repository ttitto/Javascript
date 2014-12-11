define(['AjaxRequester', 'Baas'],
    function (AjaxRequester, Baas) {
        var DataRepo = (function () {
            function DataRepo() {
                this.baas = new Baas();
                this.requester = new AjaxRequester();
                this.users = new Users(this.baas, this.requester);
            }

            var Users = (function () {
                function Users(baas, requester) {
                    this.baas = baas;
                    this.serviceUrl = baas.getUrl() + 'users';
                    this.requester = requester;
                }

                Users.prototype.register = function register(username, password) {
                    var credentials = {
                        username: username,
                        password: password
                    };
                    return this.requester.post(this.serviceUrl, this.baas.getHeaders(), credentials);
                };

                return Users;
            }());

            return DataRepo;
        }());

        return DataRepo;
    });