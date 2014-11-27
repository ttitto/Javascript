var PollApp = (function () {
    var Poll = (function () {
        function Poll(id, name) {
            this.id = id;
            this.name = name;
        }

        Object.defineProperties(Poll.prototype, {
            name: {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    // TODO: validate name
                    this._name = value;
                }
            },
            id: {
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    // TODO: validate id
                    this._id = value;
                }
            }
        });

        return Poll;
    }());

    var Answer = (function () {
        function Answer(content, isCorrect) {
            this.content = content;
            this.isCorrect = isCorrect;
        }

        Object.defineProperties(Answer.prototype, {
            content: {
                get: function () {
                    return this._content;
                },
                set: function (value) {
                    // TODO: validate content
                    this._content = value;
                }
            },
            isCorrect: {
                get: function () {
                    return this._isCorrect;
                },
                set: function (value) {
                    // TODO: validate isCorrect
                    this._isCorrect = value;
                }
            }
        });

        return Answer;
    }());

    var Question = (function () {
        function Question(pollId, content) {
            this.pollId = pollId;
            this.content = content;
            this.answers = [];
        }

        Object.defineProperties(Question.prototype, {
            content: {
                get: function () {
                    return this._content;
                },
                set: function (value) {
                    // TODO: validate content
                    this._content = value;
                }
            },
            pollId: {
                get: function () {
                    return this._pollId;
                },
                set: function (value) {
                    // TODO: validate pollId
                    this._pollId = value;
                }
            },
            answers: {
                get: function () {
                    return this._answers;
                },
                set: function (value) {
                    // TODO: validate answers
                    this._answers = value;
                }
            }
        });

        return Question;
    }());

    var Factory = (function () {
        function Factory() {
            // TODO: constructor
        }

        Object.defineProperties(Factory.prototype, {
            createPoll: {
                value: function (id, name) {

                    return new Poll(id, name);
                }
            }
        });

        return Factory;
    }());

    var PollManager = (function () {
        function PollManager(baseUrl, headers) {
            this.baseUrl = baseUrl;
            this._factory = new Factory();
            this.headers = headers;
        }

        Object.defineProperties(PollManager.prototype, {
            baseUrl: {
                get: function () {
                    return this._baseUrl;
                },
                set: function (value) {
                    // TODO: validate baseUrl
                    this._baseUrl = value;
                }
            },
            factory: {
                get: function () {
                    return this._factory;
                }
            },
            headers: {
                get: function () {
                    return this._headers;
                },
                set: function (value) {
                    // TODO: validate headers
                    this._headers = value;
                }
            },
            getActivePolls: {
                value: function (dbTable) {
                    var pollUrl = this.baseUrl + dbTable,
                        polls = [],
                        self = this,
                        d = $.Deferred();

                    $.ajax({
                        url: pollUrl,
                        type: 'GET',
                        headers: this.headers,
                        success: function (data) {
                            $.each(data.results, function (index, poll) {
                                if (poll.active) {
                                    polls.push(self.factory.createPoll(poll.objectId, this.name));
                                }
                            });
                            d.resolve(polls);
                        },
                        error: function (err) {
                            alert(err.responseText);
                            d.reject(err);
                        }
                    });
                    return d.promise();
                }
            }
        });

        return PollManager;
    }());

    var PollEngine = (function () {
        var headers = {
                'X-Parse-Application-Id': 'dCTlmZftfLumXETjHq9Or2Ll9bMDxb54X225qQZx',
                'X-Parse-REST-API-Key': '0WzEpXvKPQCsK892uA6bUP19NFXEWztIBsEMh0kT'
            },
            pollManager = new PollManager('https://api.parse.com/1/classes/', headers),
            polls = [],
            questions = [],
            answers = [];

        pollsPromise = pollManager.getActivePolls('Poll')
            .then(function (pollsResult) {
                polls = pollsResult;
                console.dir(pollsResult);
                usePolls();
            });

        console.dir(pollsPromise);
       var usePolls = function () {
            console.dir(polls);
        };
    }());

})();