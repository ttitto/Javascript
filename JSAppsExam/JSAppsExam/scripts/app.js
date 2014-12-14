require.config({
    paths: {
        'jquery': 'libs/jquery-2.1.1',
        'Sammy': 'libs/sammy',
        'Mustache': 'libs/mustache',
        'AjaxRequester': 'AjaxRequester',
        'DataRepo': 'DataRepo',
        'Controller': './controllers/Controller',
        'ProductController': './controllers/ProductController',
        'UserController': './controllers/UserController',
        'Extender': 'libs/Extender',
        'notify': 'libs/notify',
        'Baas': 'libs/Baas'
    }
});

require(["jquery", 'Sammy', 'Mustache', 'notify', 'Extender', 'Controller', 'UserController', 'ProductController', 'DataRepo'],
    function ($, Sammy, Mustache, notify, Extender, Controller, UserController, ProductController, DataRepo) {
        new Extender();

        var router,
            note = $('#notes').notify(),
            dataRepo = new DataRepo(),
            controller = new Controller(dataRepo),
            productController = new ProductController(dataRepo),
            userController = new UserController(dataRepo);

        userController.attachEventHandlers();
        productController.attachEventHandlers();

        router = Sammy(function () {
            this.get('#/', function () {
                controller.loadMenu('#menu');
                controller.loadWelcome('#main');
            });

            this.get('#/login', function () {
                controller.loadMenu('#menu');
                userController.loadLoginForm('#main');
            });

            this.get('#/register', function () {
                controller.loadMenu('#menu');
                userController.loadRegisterForm('#main');
            });

            this.get('#/logout', function () {
                window.location = '#/';
            });

            this.get('#/addProduct', function () {
                controller.loadMenu('#menu');
                productController.loadAddProductForm('#main');
            });

            this.get('#/products', function () {
                controller.loadMenu('#menu');
                productController.loadProducts('#main');

            });

            this.get('#/editProduct', function () {
                controller.loadMenu('#menu');
            });

            this.get('#/deleteProduct', function () {
                controller.loadMenu('#menu');
            });
        });

        router.run('#/');
        note.successMessage("successfully started");
    });