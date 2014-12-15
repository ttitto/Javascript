var PollSystemApp = PollSystemApp || {};

PollSystemApp.Timer = (function () {
    var _this;

    function Timer(timeout) {
        _this = this;
        this.timeout = timeout;
    }

    Object.defineProperties(Timer.prototype, {
        startTime: {
            get: function () {
                return this._startTime;
            }
        },
        timeout: {
            get: function () {
                return this._timeout;
            },
            set: function (value) {
                // TODO: validate timeout
                this._timeout = value;
            }
        },
        start: {
            value: function () {
                this._startTime = new Date();
                _this.endTime = new Date();
                _this.endTime.setSeconds(this.startTime.getSeconds() + this.timeout);
            }
        },
        endTime: {
            get: function () {
                return this._endTime;
            },
            set: function (value) {
                this._endTime = value;
            }
        },
        left: {
            get: function () {
                if (_this.timeout > 0) {
                    var diff = Math.floor((this.timeout));
                    var days = Math.floor(diff / (24 * 60 * 60));
                    var leftSec = diff - days * 24 * 60 * 60;

                    var hrs = Math.floor(leftSec / (60 * 60));
                    leftSec = leftSec - hrs * 60 * 60;

                    var min = Math.floor(leftSec / (60));
                    leftSec = leftSec - min * 60;
                } else {
                    days = 0;
                    hrs = 0;
                    min = 0;
                    leftSec = 0;
                }
                this._left = {
                    days: days,
                    hours: hrs,
                    minutes: min,
                    seconds: leftSec
                };

                return this._left;
            }
        },
        onTick: {
            value: function (callback) {
                setInterval(function () {
                    _this.timeout--;
                    callback();
                }, 1000);
            }
        },
        toString: {
            value: function () {
                return _this.left.hours + ':' + _this.left.minutes + ':' + _this.left.seconds;
            }
        }
    });

    return Timer;
}());