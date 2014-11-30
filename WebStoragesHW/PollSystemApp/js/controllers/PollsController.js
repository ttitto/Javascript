var PollSystemApp = PollSystemApp || {};

PollSystemApp.PollsController = (function () {
    function PollsController(dataPersister, headers) {
        PollSystemApp.Controller.call(this, dataPersister, headers);
    }

    PollsController.prototype = Object.create(PollSystemApp.Controller.prototype);
    PollsController.prototype.constructor = this;

    function attachPollToDom(selector, data) {
        var pollList = $('#polls-list');

        $.each(data, function (index, poll) {
            $('<li />').append(
                $('<a href="#" class="poll" />').attr('data-id', poll.objectId).append(poll.name)
            ).appendTo(pollList);
        });
    }

    PollsController.prototype.loadActive = function (selector, callback) {
        var _this = this;

        this.persister.polls.getActive(
            function (data) {
                attachPollToDom(selector, data.results);
                callback();
            },
            function (err) {
                console.log(err);
            },
            _this.getHeaders()
        );
    };

    return PollsController;
}());
