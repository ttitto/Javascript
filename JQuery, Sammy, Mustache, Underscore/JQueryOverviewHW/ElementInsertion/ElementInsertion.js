$(function () {
    var elementBefore = $('<div></div>')
            .addClass('appended'),
        elementAfter = $('<div></div>')
            .addClass('prepended'),
        middle = $('#middle');

    $(document.body).append(elementBefore);
    elementAfter.prependTo(document.body);
});