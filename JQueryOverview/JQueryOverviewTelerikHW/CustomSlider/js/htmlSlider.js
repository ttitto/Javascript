define(['/libs/jquery-2.1.1.min', 'slide'], function ($, Slide) {
    var HtmlSlider = (function () {
        function HtmlSlider(parent, slides) {
            this.parent = parent;
            this.slides = slides;
        }

        Object.defineProperties(HtmlSlider.prototype, {
            parent: {
                get: function () {
                    return this._parent;
                },
                set: function (value) {
                    // TODO: validate parent
                    this._parent = value;
                }
            },
            slides: {
                get: function () {
                    return this._slides;
                },
                set: function (value) {
                    // TODO: validate slides
                    this._slides = value;
                }
            },
            nextSlideButton: {
                get: function () {
                    return this._nextSlideButton;
                },
                set: function (value) {
                    // TODO: validate nextSlideButton
                    this._nextSlideButton = value;
                }
            },
            prevSlideButton: {
                get: function () {
                    return this._prevSlideButton;
                },
                set: function (value) {
                    // TODO: validate prevSlideButton
                    this._prevSlideButton = value;
                }
            },
            addSlide: {
                value: function (slide) {
                    this.slides.push(slide);
                }
            },
            removeSlide: {
                value: function (slide) {
                    var index = this.slides.indexOf(slide);
                    this.slides.splice(index, 1);
                }
            }
        });

        return HtmlSlider;
    }());
    return HtmlSlider;
});
