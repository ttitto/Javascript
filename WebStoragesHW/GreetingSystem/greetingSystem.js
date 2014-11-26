$(function () {
    var storage = localStorage,
        inputForm = $('#storage-input'),
        inputField,
        inputButton,
        localCount,
        sessionCount;

    if (typeof localStorage.name == 'undefined') {
        inputField = $('<input type="text" id="input-txt"/>');
        inputButton = $('<button type="button" id="input-btn">store name</button>');
        inputForm.append(inputField).append(inputButton);
    } else {
        inputForm.html('');
    }

    if (localStorage.count) {
        localCount = parseInt(localStorage.count) + 1;
    } else {
        localCount = 0;
    }

    localStorage.count = localCount;

    if (sessionStorage.count) {
        sessionCount = parseInt(sessionStorage.count) + 1;
    } else {
        sessionCount = 0;
    }

    sessionStorage.count = sessionCount;

    $('#output').html('session visits: ' + sessionCount + '<br />total visits: ' + localCount);

    $('#input-btn').click(function () {
        localStorage.setItem('name', $('#input-txt').val());
    });
});