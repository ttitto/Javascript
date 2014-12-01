var PollSystemApp = PollSystemApp || {};

PollSystemApp.QuestionsController = (function () {
    function QuestionsController(dataPersister, headers) {
        PollSystemApp.Controller.call(this, dataPersister, headers);
    }

    QuestionsController.prototype = Object.create(PollSystemApp.Controller.prototype);
    QuestionsController.prototype.constructor = this;

    function attachQuestionsToDom(selector, data) {
        console.dir(data);
    }

    QuestionsController.prototype.loadRelatedToPoll = function ( pollId, callback) {
        var _this = this;
        this.persister.questions.getRelatedToPoll(
            pollId,
            function (data) {
               // attachQuestionsToDom(selector, data.results);
                callback(data.results);
            },
            function (err) {

            },
            _this.getHeaders()
        );
    };

    return QuestionsController;
}());
