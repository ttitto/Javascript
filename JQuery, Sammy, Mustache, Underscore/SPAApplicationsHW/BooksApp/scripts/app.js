require.config({
    paths: {
        'jquery': 'libs/jquery-2.1.1',
        'Sammy': 'libs/sammy',
        'Mustache': 'libs/mustache',
        'AjaxRequester': 'AjaxRequester',
        'DataRepo': 'DataRepo',
        'Controller': './controllers/Controller',
        'UserController': './controllers/UserController',
        'BookController': './controllers/BookController',
        'Extender': 'libs/Extender',
        'notify': 'libs/notify',
        'Baas': 'libs/Baas'
    }
});

require(["jquery", 'Sammy', 'Mustache', 'notify', 'Extender', 'Controller', 'UserController', 'BookController', 'DataRepo'],
    function ($, Sammy, Mustache, notify, Extender, Controller, UserController, BookController, DataRepo) {
        new Extender();

        var router,
            note = $('#notes').notify(),
            dataRepo = new DataRepo(),
            controller = new Controller(dataRepo),
            userController = new UserController(dataRepo),
            bookController = new BookController(dataRepo);

        userController.attachEventHandlers();
        bookController.attachEventHandlers();

        router = Sammy(function () {
            this.get('#/', function () {
               // controller.loadHome('#main');
                controller.loadTopNavigation('#top-nav');
                bookController.loadUserBooks('#my-books');
            });

            this.get('#/login', function () {
                userController.loadLogin('#user-forms');
            });

            this.get('#/register', function () {
                userController.loadRegister('#user-forms');
            });

            this.get('#/newBook', function () {
               // controller.loadHome('#main');
                controller.loadTopNavigation('#top-nav');
                bookController.loadBookForm('#main');
            });

            this.get('#/books', function(){
                controller.loadTopNavigation('#top-nav');
                bookController.loadUserBooks('#my-books');
            });
        });

        router.run('#/');
        note.successMessage("successfully started");
    });