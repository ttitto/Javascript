define([], function () {
    var Extender = (function () {
        function Extender() {
            init();
        }

        function init() {
            (function initObjectExtensions() {
//                Object.prototype.inherits = function (parent) {
//                    this.prototype = Object.create(parent.prototype);
//                    this.prototype.constructor = this;
//                };
            }());

            (function initStringExtensions() {
                String.prototype.isString = function (errorMessage) {
                    if (typeof this !== 'string') {
                        throw new TypeError(errorMessage);
                    }

                    return this;
                };

                String.prototype.isNullEmptyUndefined = function (errorMessage) {
                    if (!this) {
                        throw new ReferenceError(errorMessage);
                    }

                    return this;
                };

                if (!String.prototype.format) {
                    String.prototype.format = function () {
                        var args = arguments;
                        return this.replace(/{(\d+)}/g, function (match, number) {
                            return typeof args[number] != 'undefined' ? args[number] : match;
                        });
                    };
                }
            }());

            (function initNumberExtensions() {
                Number.prototype.isNumber = function (errorMessage) {
                    if (typeof this !== 'number') {
                        throw  new TypeError(errorMessage);
                    }

                    return this;
                };

                Number.prototype.isInteger = function (errorMessage) {
                    if ((this % 1) !== 0) {
                        throw  new TypeError(errorMessage);
                    }

                    return this;
                };

                Number.prototype.isInRange = function (min, max, errorMessage) {
                    if ((this < min) || (this > max)) {
                        throw  new RangeError(errorMessage);
                    }

                    return this;
                };

                Number.prototype.isPositive = function (errorMessage) {
                    if (this <= 0) {
                        throw  new RangeError(errorMessage);
                    }

                    return this;
                };

                Number.prototype.isNonNegative = function (errorMessage) {
                    if (this < 0) {
                        throw  new RangeError(errorMessage);
                    }

                    return this;
                }
            }());
        }

        return Extender;
    }());

    return Extender;
});