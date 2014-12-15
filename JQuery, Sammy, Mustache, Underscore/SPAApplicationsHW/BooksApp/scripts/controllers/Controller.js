define([ 'DataRepo', 'Mustache'],
    function (DataRepo, Mustache) {
        var Controller = (function () {

            function Controller(dataRepo) {
                this.setDataRepo(dataRepo);
            }

            Controller.prototype.getDataRepo = function getDataRepo() {
                return this._dataRepo;
            };

            Controller.prototype.setDataRepo = function setDataRepo(dataRepo) {
                this._dataRepo = dataRepo;
            };

            Controller.prototype.loadHome = function loadHome(selector) {
                $(selector).load('./templates/home.html')
            };

            Controller.prototype.loadTopNavigation = function loadTopNavigation(selector) {
                var userData = JSON.parse(sessionStorage.getItem('UserData'));

                $.get('./templates/TopNavigation.html', function (template) {
                    var output = Mustache.render(template, userData);
                    $(selector).html(output);
                });
            };

            Controller.prototype.attachEventHandlers = function attachEventHandlers() {
                // TODO: add event handlers here
            };

            return Controller;
        }());

        return Controller;
    });