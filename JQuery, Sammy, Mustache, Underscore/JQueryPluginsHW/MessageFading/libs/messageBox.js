(function ($) {
    $.fn.messageBox = function () {
        var $this = $(this);
        $this.css({
            'font-size': '20px',
            'width': '200px',
            "border-radius": '15px',
            'padding': '3px',
            'text-align': 'center'
        });
        var success = function (message) {
                $this.css({
                    'background-color': 'blue',
                    'color': 'orange'
                })
                    .html(message)
                    .fadeIn(1000);
                setTimeout(function () {
                    $this.fadeOut(1000)
                }, 3000);
            },
            error = function (message) {
                $this.css({
                    'background-color': 'red',
                    'color': 'black'
                })
                    .html(message)
                    .fadeIn(1000);
                setTimeout(function () {
                    $this.fadeOut(1000)
                }, 3000);
            };

        return{
            success: success,
            error: error
        }
    }
}(jQuery));