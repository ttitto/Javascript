define([ 'DataRepo'],
    function (DataRepo) {
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

            Controller.prototype.loadHome = function loadHome(selector){
                $(selector).load('./templates/home.html')
            };

            Controller.prototype.loadTopNavigation = function loadTopNavigation(selector) {
                $(selector).load('./templates/topNavigation.html');
            };

            Controller.prototype.loadUserTopNavigation = function loadUserTopNavigation(selector) {
                $(selector).load('./templates/userTopNavigation.html');
            };

            Controller.prototype.attachEventHandlers = function attachEventHandlers() {
                // TODO: add event handlers here
            };

            return Controller;
        }());

        return Controller;
    });