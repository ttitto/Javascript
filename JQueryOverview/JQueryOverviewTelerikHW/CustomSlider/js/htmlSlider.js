define(['jquery', 'slide'], function ($, Slide) {
    var HtmlSlider = (function () {
        function HtmlSlider(parent, slides, prevSlideButton, nextSlideButton) {
            this.parent = parent;
            this.slides = slides;
            this.prevSlideButton = prevSlideButton;
            this.nextSlideButton = nextSlideButton;
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
            },
            appendToParent: {
                value: function () {
                    var self = this;
                    $.each(this.slides, function (index, slide) {
                        slide.appendTo(self.parent);
                    });
                }
            }
        });

        return HtmlSlider;
    }());
    return HtmlSlider;
});
