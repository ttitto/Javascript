var PollSystemApp = PollSystemApp || {};

PollSystemApp.AnswersController = (function () {
    function AnswersController(dataPersister, headers) {
        PollSystemApp.Controller.call(this, dataPersister, headers);
    }

    AnswersController.prototype = Object.create(PollSystemApp.Controller.prototype);
    AnswersController.prototype.constructor = this;

    AnswersController.prototype.load = function (selector, callback) {
        var _this = this;

        this.persister.answers.getAllWithQuestions(
            function (data) {
                callback(data.results);
            },
            function (err) {
                console.log(err);
            },
            _this.getHeaders()
        )
    };

    AnswersController.prototype.getByIdWithQuestion = function (answerId, callback) {
        var _this = this;

        this.persister.answers.getByIdWithQuestions(
            function (data) {
                callback(data);
            },
            function (err) {
                console.log(err);
            },
            _this.getHeaders(),
            answerId
        )
    };

    return AnswersController;
}());