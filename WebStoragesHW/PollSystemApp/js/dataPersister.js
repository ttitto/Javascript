var PollSystemApp = PollSystemApp || {};

PollSystemApp.dataPersister = (function () {
    function Persister(baseUrl) {
        this.baseURl = baseUrl;
        this.polls = new Polls(baseUrl);
        this.questions = new Questions(baseUrl);
        this.answers = new Answers(baseUrl);
    }

    var Polls = (function () {
        function Polls(baseUrl) {
            this.pollsUrl = baseUrl + 'Poll/';
        }

        Polls.prototype.getAll = function getAll(success, error, headers) {
            ajaxRequester.get(this.pollsUrl, success, error, headers);
        };

        Polls.prototype.getActive = function getActive(success, error, headers) {
            var activePollsUrl = this.pollsUrl + '?where={"isActive":true}';
            ajaxRequester.get(activePollsUrl, success, error, headers);
        };

        return Polls;
    }());

    var Questions = (function () {
        function Questions(baseUrl) {
            this.questionsUrl = baseUrl + 'Question/';
        }

        Questions.prototype.getAll = function (success, error, headers) {
            ajaxRequester(this.questionsUrl, success, error, headers);
        };

        Questions.prototype.getRelatedToPoll = function (pollId, success, error, headers) {
            var url = this.questionsUrl + pollId;
            ajaxRequester(url, success, error, headers);
        };

        return Questions;
    }());

    var Answers = (function () {
        function Answers(baseUrl) {
            this.answersUrl = baseUrl + "Answer/";
        }

        Answers.prototype.getAll = function (success, error, headers) {
            ajaxRequester(this.answersUrl, success, error, headers);
        };

        Answers.prototype.getRelatedToPoll = function(pollId, success, error, headers){

        };

        return Answers;
    }());

    return{
        get: function (baseUrl) {
            return new Persister(baseUrl);
        }
    }
}());