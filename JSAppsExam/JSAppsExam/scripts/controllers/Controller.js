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

            Controller.prototype.getLoggedUser = function getLoggedUser() {
                return JSON.parse(sessionStorage.getItem('UserData'));
            };

            Controller.prototype.loadMenu = function loadMenu(selector) {
                if (this.getLoggedUser()) {
                    $(selector).load('templates/topNavigationUser.html');
                } else {
                    $(selector).load('templates/topNavigationGuest.html');
                }
            };

            Controller.prototype.loadWelcome = function loadWelcome(selector) {
                var loggedUserData = this.getLoggedUser(),
                    welcomeUserHtml;

                if (loggedUserData) {

                    $.get('templates/welcomeUser.html', function (template) {
                        welcomeUserHtml = Mustache.render(template, loggedUserData);
                        $(selector).html(welcomeUserHtml);
                    });

                } else {
                    $(selector).load('templates/welcomeGuest.html');
                }
            };

            Controller.prototype.attachEventHandlers = function attachEventHandlers() {
                // TODO: add event handlers here
            };

            return Controller;
        }());

        return Controller;
    });