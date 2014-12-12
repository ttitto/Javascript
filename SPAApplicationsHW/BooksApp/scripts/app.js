require.config({
    paths: {
        'jquery': 'libs/jquery-2.1.1',
        'sammy': 'libs/sammy',
        'mustache': 'libs/mustache',
        'AjaxRequester': 'AjaxRequester',
        'DataRepo': 'DataRepo',
        'Controller': './controllers/Controller',
        'UserController': './controllers/UserController',
        'Extender': 'libs/Extender',
        'notify': 'libs/notify',
        'Baas': 'libs/Baas'
    }
});

require(["jquery", 'sammy', 'mustache', 'notify', 'Extender', 'Controller', 'UserController', 'DataRepo'],
    function ($, sammy, mustache, notify, Extender, Controller, UserController, DataRepo) {
        new Extender();

        var router,
            note = $('#notes').notify(),
            dataRepo = new DataRepo(),
            userController = new UserController(dataRepo),
            controller = new Controller(dataRepo);

        userController.attachEventHandlers();

        router = sammy(function () {
            this.get('#/', function () {
                controller.loadHome('#main');
                controller.loadTopNavigation('#top-nav');
            });

            this.get('#/login', function () {
                userController.loadLogin('#user-forms');
            });

            this.get('#/register', function () {
                userController.loadRegister('#user-forms');

            });
        });

        router.run('#/');
        note.successMessage("successfully started");
    });