var FlyingCircles = (function () {
    var FlyingCircle = (function () {
        function FlyingCircle(x, y, radius, direction) {
            this.setX(x);
            this.setY(y);
            this.setRadius(radius);
            this.setDirection(direction);
        }

        FlyingCircle.prototype.getX = function () {
            return this._x;
        };

        FlyingCircle.prototype.setX = function (x) {
            this._x = x;
        };

        FlyingCircle.prototype.getY = function () {
            return this._y;
        };

        FlyingCircle.prototype.setY = function (y) {
            this._y = y;
        };

        FlyingCircle.prototype.getRadius = function () {
            return this._radius;
        };

        FlyingCircle.prototype.setRadius = function (radius) {
            this._radius = radius;
        };

        FlyingCircle.prototype.getDirection = function () {
            return this._direction;
        };

        FlyingCircle.prototype.setDirection = function (direction) {
            this._direction = direction;
        };

        FlyingCircle.prototype.clean = function (context) {
            // TODO: implement clean circle

        };

        FlyingCircle.prototype.draw = function (context) {
            // TODO: drawing
            context.beginPath();
            context.arc(this.getX(), this.getY(), this.getRadius(), 0, 2 * Math.PI);

        };

        FlyingCircle.prototype.updatePosition = function () {
            // TODO: implement position update
        };

        return FlyingCircle;
    }());

    var FlyingCircleApi = (function () {
        var canvas = document.getElementById("the-canvas"),
            ctx = canvas.getContext('2d'),
            windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;
    }());
}());