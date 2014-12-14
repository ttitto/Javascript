define(['AjaxRequester', 'Baas'],
    function (AjaxRequester, Baas) {
        var DataRepo = (function () {
            function DataRepo() {
                this.baas = new Baas();
                this.requester = new AjaxRequester();
                this.users = new Users(this.baas, this.requester);
                this.products = new Products(this.baas, this.requester);
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

            var Products = (function () {
                function Products(baas, requester) {
                    BaseDataClass.call(this, baas, requester);
                    this.serviceUrl = baas.getUrl() + 'classes/Product'
                }

                Products.prototype = Object.create(BaseDataClass.prototype);
                Products.prototype.constructor = this;

                Products.prototype.addProduct = function addProduct(product) {
                    return  this.requester.post(this.serviceUrl, this.baas.getHeaders(), product);
                };

                Products.prototype.loadProducts = function loadProducts() {
                    return this.requester.get(this.serviceUrl, this.baas.getHeaders());
                };

                Products.prototype.getProductById = function getProductById(id) {
                    var productUrl = this.serviceUrl + '/' + id;
                    return this.requester.get(productUrl, this.baas.getHeaders());
                };

                Products.prototype.deleteProduct = function deleteProduct(id) {
                    var productUrl = this.serviceUrl + '/' + id,
                        sessionToken = JSON.parse(sessionStorage.getItem('UserData')).sessionToken,
                        extendedHeaders = $.extend(this.baas.getHeaders(), {'X-Parse-Session-Token': sessionToken});
                    return this.requester.del(productUrl, extendedHeaders);
                };
                Products.prototype.editProduct = function editProduct(id, product) {
                    var productUrl = this.serviceUrl + '/' + id,
                        sessionToken = JSON.parse(sessionStorage.getItem('UserData')).sessionToken,
                        extendedHeaders = $.extend(this.baas.getHeaders(), {'X-Parse-Session-Token': sessionToken});
                    return this.requester.put(productUrl, extendedHeaders, product);
                };

                return Products;
            }());

            return DataRepo;
        }());

        return DataRepo;
    });