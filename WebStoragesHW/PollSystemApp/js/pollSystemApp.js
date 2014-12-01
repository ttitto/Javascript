(function () {
    var baseUrl = 'https://api.parse.com/1/classes/',
        dataPersister = PollSystemApp.dataPersister.get(baseUrl),
        headers = {
            'X-Parse-Application-Id': 'dCTlmZftfLumXETjHq9Or2Ll9bMDxb54X225qQZx',
            'X-Parse-REST-API-Key': '0WzEpXvKPQCsK892uA6bUP19NFXEWztIBsEMh0kT'
        },
        pollController = new PollSystemApp.PollsController(dataPersister, headers),
        questionsController = new PollSystemApp.QuestionsController(dataPersister, headers),
        answersController = new PollSystemApp.AnswersController(dataPersister, headers),
        questions = [],
        data;

    pollController.loadActive('#polls-list', attachPollsEvents);

    function attachPollsEvents() {
        $('.poll').on('click', function (e) {
            e.preventDefault();
            var thisId = $(this).attr('data-id'),
                answersData,
                timer,
                newTimer;
            $('#questions-area').html('');
            if (localStorage.timer) {
                timer = JSON.parse(localStorage.timer);
                newTimer = new PollSystemApp.Timer(5 * 60);

                if (!timer) {
                    timer = new PollSystemApp.Timer(5 * 60);
                    timer.start();
                }

                $.extend(newTimer, timer);
                timer = newTimer;

                var parsedEndTime = Date.parse(timer.endTime);
                var parsedCurrentTime = Date.parse(new Date().toString());
                timer.timeout = (parsedEndTime - parsedCurrentTime) / (1000);
                console.dir(timer);
            }

            if (localStorage.answers) {
                answersData = JSON.parse(localStorage.answers);

                if (parsedEndTime < new Date()) {
                    // The time has ended while the page was closed

                    // TODO: implement evaluate
                    evaluateResults(answersData, thisId);
                } else {
                    loadAnswers(answersData, thisId, timer);
                }
            } else {
                answersController.load('#', function (data, pollId) {
                    loadAnswers(data, thisId, timer);
                });
            }
        });
    }

    function loadAnswers(data, pollId, timer) {
        var questionsArea = $('#questions-area')
        questions = {};

        $.each(data, function (index, answer) {
            var questId = answer.questionId.objectId,
                answId = answer.objectId,
                questionContainer = $('#' + questId),
                answersContainer = questionContainer.find('.answers.' + questId);

            if (answer.questionId.pollId.objectId == pollId) {
                if (!questions[questId]) {
                    questionContainer = $('<div class="full-question" id="' + questId + '">')
                        .append($('<h3 class="question">' + answer.questionId.content + '</h3>'))
                        .append($('<div class="answers">').addClass(questId));
                    questions[questId] = questionContainer;
                }

                questionContainer = questions[questId];
                answersContainer = questionContainer.find('.answers.' + questId);
                questionContainer.append(answersContainer);
            }

            var answerInput = $('<input type="radio" name="' + questId + '" id="' + answId + '" data-id="' + answId + '"/>')
                .addClass('answer-radio');
            if (answer.checked) {
                if (answer.checked == 'checked') {
                    answerInput.prop("checked", true);
                }
            }
            var answerLabel = $('<label for="' + answId + '">' + answer.content + '</label>');
            answersContainer.append(answerInput).append(answerLabel).append('<br />');
        });

        $.each(questions, function (index) {
            questionsArea.append(questions[index]);
        });
        onRadioButtonChange(data);
        loadSubmitButton(questionsArea);
        onSubmitButtonClick(data, pollId);
        timerInitialize(timer, data);
    }

    function loadSubmitButton(parent) {
        $('<input type="button" id="submit-btn" value="Submit" />').appendTo(parent);
    }

    function onRadioButtonChange(data) {
        $('.answer-radio').on('change', function () {
            var answerId = $(this).attr('data-id'),
                questId = $(this).attr('name');
            var answersForQuestionId = $('[name=' + questId + ']');
            var objAnswer;
            $.each(data, function (index, answer) {
                if (answer.questionId.objectId == questId) {
                    if (answer.objectId == answerId) {
                        objAnswer = answer;
                        answer.checked = 'checked';
                    } else {
                        answer.checked = '';
                    }
                }
            });

            $(this).prop("checked", true);

            localStorage.setItem('answers', JSON.stringify(data));
        });
    }

    function onSubmitButtonClick(data, pollId) {
        $('#submit-btn').on('click', function () {
            evaluateResults(data, pollId);
        });
    }

    function timerInitialize(timer, data) {
        if (!timer) {
            timer = new PollSystemApp.Timer(5 * 60);
            timer.start();
        }

        timer.onTick(function () {
            loadTimer(timer);
            localStorage.setItem('timer', JSON.stringify(timer));
//            localStorage.setItem('answers', JSON.stringify(data));
        });

        return timer;
    }

    function loadTimer(timer) {
        $('#timer').html(timer.toString());
    }

    function evaluateResults(data, pollId) {
        console.log('evaluate results');
        var wrongAnswers = [],
            questions = [],
            correctAnswersCount = 0,
            totalQuestionsCount,
            outputStr = '';
        questionsController.loadRelatedToPoll(pollId, function (questionsData) {
            totalQuestionsCount = questionsData.length;

            $.each(data, function (index, answer) {
                if (answer.checked == 'checked') {
                    answersController.getByIdWithQuestion(answer.objectId, function (answ) {
                        if (answ.isCorrect == false) {
                            wrongAnswers.push(answ.questionId.content + ' => ' + answ.content);
                        } else {
                            correctAnswersCount++;
                        }

                        outputStr = 'Your results will be lost if you do not save it now!<br/>';
                        outputStr += 'You have ' + correctAnswersCount + ' correct answers.<br/>';
                        outputStr += 'Your result is: ' + (100 * correctAnswersCount / totalQuestionsCount).toFixed(2) + '%<br/>';
                        outputStr += 'Your wrong answers are:<br/>';
                        $.each($(wrongAnswers), function (key, value) {
                            outputStr += value + '<br/>';
                        });
                        $('#results').html(outputStr);
                    });
                }
            });


        });


        localStorage.removeItem('answers');
        localStorage.removeItem('timer');
    }

}());



