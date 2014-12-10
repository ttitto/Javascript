define([ 'DataRepo'],
    function (DataRepo) {
        var Controller = (function () {
            function Controller(dataRepo) {
                this.setDataRepo(dataRepo);
            }

            Controller.prototype.getDataRepo = function getDataRepo () {
                return this._dataRepo;
            };

            Controller.prototype.setDataRepo = function setDataRepo(dataRepo) {
                this._dataRepo = dataRepo;
            };

            Controller.prototype.attachEventHandlers = function attachEventHandlers(){
                // TODO: add event handlers here
            };

            return Controller;
        }());

        return Controller;
    });