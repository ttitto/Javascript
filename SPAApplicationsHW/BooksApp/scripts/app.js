require.config({
    paths: {
        'jquery': 'libs/jquery-2.1.1',
        'sammy': 'libs/sammy',
        'mustache': 'libs/mustache',
        'AjaxRequester': 'AjaxRequester',
        'DataRepo': 'DataRepo',
        'Controller': './controllers/Controller',
        'Extender': 'libs/Extender',
        'notify': 'libs/notify',
        'Baas': 'libs/Baas'
    }
});

require(["jquery", 'sammy', 'mustache', 'notify', 'Extender'],
    function ($, sammy, mustache, notify, Extender) {
        new Extender();

        var note = $('#notes').notify();
        note.successMessage("successfull notify");

    });