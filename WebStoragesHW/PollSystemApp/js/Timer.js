var PollSystemApp = PollSystemApp || {};

PollSystemApp.Timer = (function () {
    function Timer(timeout) {
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
                this._endTime = new Date();
                this._endTime.setDate(this._startTime.getSeconds() + this.timeout);
            }
        },
        endTime: {
            get: function () {
                return this._endTime;
            }
        },
        onTick: {
            value: function (callback) {
                setInterval(function () {
                    callback();
                }, 1000);
            }
        },
        toString: {
            value: function () {
                // TODO: implement
                return '';
            }
        }
    });

    return Timer;
}());