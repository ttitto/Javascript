define([], function () {
    var Slide = (function () {
        function Slide(inner) {
            this.innerHtml = innerHtml;
        }

        Object.defineProperties(Slide.prototype, {
            innerHtml: {
                get: function () {
                    return this._innerHtml;
                },
                set: function (value) {
                    // TODO: validate innerHTML
                    this._innerHtml = value;
                }
            }
        });

        return Slide;
    }());

    return Slide;
});