var FlyingCircles = (function () {
    'use strict';
    var FlyingCircle = (function () {
        function FlyingCircle(x, y, radius, strokeWidth, direction) {
            this.setX(x);
            this.setY(y);
            this.setRadius(radius);
            this.setStrokeWidth(strokeWidth);
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

        FlyingCircle.prototype.getStrokeWidth = function () {
            return this._strokeWidth;
        };

        FlyingCircle.prototype.setStrokeWidth = function (strokeWidth) {
            this._strokeWidth = strokeWidth;
        };

        FlyingCircle.prototype.setDirection = function (direction) {
            this._direction = direction;
        };

        FlyingCircle.prototype.clean = function (context) {
            context.clearRect(this.getX() - this.getRadius() - this.getStrokeWidth(), this.getY() - this.getRadius() - this.getStrokeWidth(),
                (this.getStrokeWidth() + this.getRadius()) * 2, (this.getStrokeWidth() + this.getRadius()) * 2);
        };

        FlyingCircle.prototype.draw = function (context) {
            context.lineWidth = this.getStrokeWidth();
            context.beginPath();
            context.arc(this.getX(), this.getY(), this.getRadius(), 0, 2 * Math.PI);
            context.closePath();
            context.fill();
            context.stroke();
        };

        FlyingCircle.prototype.updatePosition = function (width, height) {
            var left, right, top, bottom;
            right = this.getX() + this.getRadius() + this.getStrokeWidth();
            if (right >= width) {
                this.setDirection([-1 * this.getDirection()[0], this.getDirection()[1]]);
            }

            bottom = this.getY() + this.getRadius() + this.getStrokeWidth();
            if (bottom >= height) {
                this.setDirection([this.getDirection()[0], -1 * this.getDirection()[1]]);
            }

            left = this.getX() - this.getRadius() - this.getStrokeWidth();
            if (left <= 0) {
                this.setDirection([-1 * this.getDirection()[0], this.getDirection()[1]]);
            }

            top = this.getY() - this.getRadius() - this.getStrokeWidth();
            if (top <= 0) {
                this.setDirection([this.getDirection()[0], -1 * this.getDirection()[1]]);
            }

            this.setX(this.getX() + this.getDirection()[0]);
            this.setY(this.getY() + this.getDirection()[1]);
        };

        return FlyingCircle;
    }());

    var FlyingCircleApi = (function () {
        var canvas = document.getElementById("the-canvas"),
            ctx = canvas.getContext('2d'),
            windowWidth = window.innerWidth,
            windowHeight = window.innerHeight,
            circles = [];

        ctx.canvas.width = windowWidth;
        ctx.canvas.height = windowHeight;

        circles.push(new FlyingCircle(125, windowHeight - 60, 20, 2, [-1, -1]));
        circles.push(new FlyingCircle(20, 20, 15, 2, [1, 1]));
        circles.push(new FlyingCircle(windowWidth - 250, windowHeight - 60, 20, 2, [-1, -1]));
        circles.push(new FlyingCircle(200, 200, 35, 2, [1, 1]));

        function frame(circles) {
            for (var i = 0; i < circles.length; i++) {
                var circle = circles[i];
                circle.clean(ctx);
                circle.updatePosition(windowWidth, windowHeight);
                circle.draw(ctx);
            }
        }

        ctx.fillStyle = 'orange';
        ctx.strokeStyle = 'blue';
        setInterval(function () {
            frame(circles)
        }, 10);
    }());
}());