define(["jquery"], function ($) {
    (function ($) {
        $.fn.notify = function () {
            var $this = $(this),
                errorMessage = function (err, message) {
                    var errorsDiv = $('<div />');
                    errorsDiv.addClass('errors-container').html(message + ': ' + err).appendTo($this).fadeOut(4000);
                    setTimeout(function () {
                        errorsDiv.remove();
                    }, 6000);
                },

                successMessage = function (message) {
                    var successDiv = $('<div />');
                    successDiv.addClass('success-message-container').html(message).appendTo($this).fadeOut(4000);
                    setTimeout(function () {
                        successDiv.remove();
                    }, 6000);
                };

            return {
                errorMessage: errorMessage,
                successMessage: successMessage
            }
        }
    }(jQuery));
});