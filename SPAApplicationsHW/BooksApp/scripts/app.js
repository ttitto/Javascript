require.config({
    paths: {
        'jquery': 'libs/jquery-2.1.1',
        'sammy': 'libs/sammy',
        'mustache': 'libs/mustache',
        'AjaxRequester': 'AjaxRequester',
        'DataRepo': 'DataRepo',
        'Controller': './controllers/Controller',
        'Extender': 'libs/Extender',
        'notify': 'libs/notify'
    }
});

require(["jquery", 'sammy', 'mustache', 'Extender', 'notify'],
    function ($, sammy, mustache, Extender, notify) {
        new Extender();

        var note = $('#notes').notify();
        note.successMessage("successfull notify");

    });