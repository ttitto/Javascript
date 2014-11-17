(function () {
    require.config({
        paths: {
            "jquery": "../libs/jquery-2.1.1.min"
        }
    });

    require(['jquery', 'slide', 'htmlSlider'],
        function ($, Slide, HtmlSlider) {
            var sliderContainer = $('#slider-container'),
                htmlSlider,
                $slide1,
                $slide2;

            htmlSlider = new HtmlSlider(sliderContainer, []);

            $slide1 = $('<div />')
                .addClass('slide')
                .addClass('visible');

            $slide2 = $('<div />')
                .addClass('slide');

            htmlSlider.addSlide($slide1);
            htmlSlider.addSlide($slide2);
            htmlSlider.appendToParent();
        }
    );
}());