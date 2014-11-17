(function () {
    "use strict";
    require(['/libs/jquery-2.1.1.min', 'slide', 'htmlSlider'],
        function ($, Slide, HtmlSlider) {
            var $slide1 = $('<div />'),
                sliderContainer = $('#slider-container'),
                htmlSlider;

            $slide1.addClass('slide');
            htmlSlider = new HtmlSlider(sliderContainer, [$slide1]);

        }
    );
});