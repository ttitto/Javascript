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
                leftButton,
                rightButton,
                $slide1,
                $slide2,
                $slide3;

            htmlSlider = new HtmlSlider(sliderContainer, []);

            $slide2 = $('<div id="slide2">' +
                '<div id="head">' +
                '<div id="nose"></div>' +
                '<div id="left-eye">' +
                '<div id="left-iris"></div>' +
                '</div>' +
                '<div id="right-eye">' +
                '<div id="right-iris"></div>' +
                '</div>' +
                '<div id="mouth">' +
                '<div id="left-tooth"></div>' +
                '<div id="right-tooth"></div>' +
                '</div>' +
                '</div>' +
                '<span>Student before exam</span>' +
                '</div>')
                .addClass('slide');

            $slide1 = $('<div id="slide1"><div id="wrapper">' +
                '    <h1>Enter the system</h1>' +
                '    <p>It is necessary to login in Your account in order to sign in for a course.</p>' +
                '<form method="post" action="">' +
                '    <fieldset class="clearfix gray left">' +
                '        <h2>ARE YOU NEW? <span>REGISTER</span></h2>' +
                '        <input type="text" name="username" placeholder="User name">' +
                '            <input type="text" name="email" placeholder="Email">' +
                '                <input type="text" name="password" placeholder="Password">' +
                '                    <input type="text" name="confirm-password" placeholder="Confirm Password">' +
                '                        <input type="button" class="right" value="Register">' +
                '                        </fieldset>' +
                '                    </form>' +
                '                    <form action="" method="post">' +
                '                        <fieldset class="left blue clearfix">' +
                '                            <h2>ALREADY A STUDENT? LOGIN</h2>' +
                '                            <input type="text" name="username" placeholder="User name" />' +
                '                            <input type="password" name="password" placeholder="Password">' +
                '                                <input type="checkbox" name="remember" id="remember" class="left">' +
                '                                    <label class="left" for="remember">Remember me?</label>' +
                '                                    <div class="right">' +
                '                                        <input type="button" value="Login">' +
                '                                            <a href="#">Forgot Password</a>' +
                '                                        </div>' +
                '                                    </fieldset>' +
                '                                </form>' +
                '                            </div></div>')
                .addClass('slide')
                .addClass('visible');

            $slide3 = $('<div id="slide3"><img src="imgs/younocomeout.jpg" alt="you no come out"/></div>')
                .addClass('slide');

            htmlSlider.addSlide($slide1);
            htmlSlider.addSlide($slide2);
            htmlSlider.addSlide($slide3);
            htmlSlider.appendToParent();

            htmlSlider.nextSlideButton = $('<img src="imgs/right.jpg" alt="next"/>')
                .addClass('slider-button')
                .addClass('next');

            htmlSlider.prevSlideButton = $('<img src="imgs/left.jpg" alt="previous"/>')
                .addClass('slider-button')
                .addClass('previous');

            sliderContainer.append(htmlSlider.prevSlideButton);
            sliderContainer.append(htmlSlider.nextSlideButton);

            htmlSlider.nextSlideButton.on('click', function () {
                var $currentSlide = $('.slide.visible')[0],
                    len = htmlSlider.slides.length;

                $.each(htmlSlider.slides, function (index, elem) {
                        if ($(elem).hasClass('visible')) {
                            $(elem).removeClass('visible');
                            htmlSlider.slides[(index + 1) % len].addClass('visible');
                            return false;
                        }
                    }
                );
            });

            htmlSlider.prevSlideButton.on('click', function () {
                var $currentSlide = $('.slide.visible')[0],
                    len = htmlSlider.slides.length;

                $.each(htmlSlider.slides, function (index, elem) {
                        if ($(elem).hasClass('visible')) {
                            $(elem).removeClass('visible');
                            htmlSlider.slides[(index - 1) < 0 ? len - 1 : index - 1].addClass('visible');
                            return false;
                        }
                    }
                );

            });

            window.setInterval(function(){
                htmlSlider.nextSlideButton.click();
            }, 5000);
        }
    );
}());