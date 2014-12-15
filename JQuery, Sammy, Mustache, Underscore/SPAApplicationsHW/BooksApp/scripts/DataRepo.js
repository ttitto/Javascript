define(['AjaxRequester', 'Baas'],
    function (AjaxRequester, Baas) {
        var DataRepo = (function () {
            function DataRepo() {
                this.baas = new Baas();
                this.requester = new AjaxRequester();
                this.users = new Users(this.baas, this.requester);
                this.books = new Books(this.baas, this.requester);
            }

            var BaseDataClass = (function () {
                function BaseDataClass(baas, requester) {
                    this.baas = baas;
                    this.requester = requester;
                }

                return BaseDataClass;
            }());

            var Users = (function () {
                function Users(baas, requester) {
                    BaseDataClass.call(this, baas, requester);
                    this.serviceUrl = baas.getUrl() + 'users';
                }

                Users.prototype = Object.create(BaseDataClass.prototype);
                Users.prototype.constructor = this;

                Users.prototype.register = function register(username, password) {
                    var credentials = {
                        username: username,
                        password: password
                    };
                    return this.requester.post(this.serviceUrl, this.baas.getHeaders(), credentials);
                };

                Users.prototype.login = function login(username, password) {
                    var credentials = {
                            username: username,
                            password: password
                        },
                        loginUrl = this.baas.getUrl() + 'login?username=' + username + '&password=' + password;

                    return this.requester.get(loginUrl, this.baas.getHeaders(), credentials);
                };

                return Users;
            }());

            var Books = (function () {
                function Books(baas, requester) {
                    BaseDataClass.call(this, baas, requester);
                    this.serviceUrl = baas.getUrl() + 'classes/Book';
                }

                Books.prototype = Object.create(BaseDataClass.prototype);
                Books.prototype.constructor = this;

                Books.prototype.createBook = function createBook(book) {
                    return  this.requester.post(this.serviceUrl, this.baas.getHeaders(), book);
                };

                Books.prototype.loadUserBooks = function (userId){
                    var userBooksUrl = this.serviceUrl + this.baas.getWhereString('userId', '_User', userId);
                    return this.requester.get(userBooksUrl, this.baas.getHeaders());
                };

                return Books;
            }());


            return DataRepo;
        }());

        return DataRepo;
    });