var Shapes = (function () {
    var Point = (function () {
        function Point(x, y, z) {
            this._x = x;
            this._y = y;
            this._z = z || 0;
        }

        function getX() {
            return this._x;
        }

        function getY() {
            return this._y;
        }

        function getZ() {
            return this._z;
        }

        Point.prototype = {
            getX: getX,
            getY: getY,
            getZ: getZ
        }

        return Point;
    }());

    var Shape = (function () {
        var self;

        function Shape(point, color) {
            this._type = "Point";
            this._point = point;
            this._color = color;
            self = this;
        }

        function getShapeType() {
            return this._type;
        }

        function getColor() {
            return this._color;
        }

        function getPoint() {
            return this._point;
        }

        Shape.prototype = {
            getShapeType: getShapeType,
            getPoint: getPoint,
            getColor: getColor,
            getParametersControls: function () {
                var controls = [];

                var lblX1 = document.createElement("label");
                lblX1.setAttribute("for", "x1");
                lblX1.innerHTML = "X1";
                controls.push(lblX1);

                var inputX1 = document.createElement("input");
                inputX1.setAttribute("type", "text");
                inputX1.id = "x1";
                controls.push(inputX1);

                var lblY1 = document.createElement("label");
                lblY1.setAttribute("for", "y1");
                lblY1.innerHTML = "Y1";
                controls.push(lblY1);

                var inputY1 = document.createElement("input");
                inputY1.setAttribute("type", "text");
                inputY1.id = "y1";
                controls.push(inputY1);

                return controls;
            },
            draw: function (drawingBoard) {
                var ctx = drawingBoard.getContext("2d");
                ctx.beginPath();
                ctx.fillStyle = this._color;
                ctx.fillRect(this._point.getX(), this._point.getY(), 2, 2);
                ctx.closePath();
            },

            toString: function () {
                return this._type + " - X1: " + this._point.getX() + ", Y1: " + this._point.getY() + ", Color: " + this._color;
            }
        };

        return Shape;
    }());

    var Circle = (function () {
        var self;

        function validateRadius(radius) {
            if (radius <= 0) {
                return false;
            }
            return true;
        }

        function Circle(point, radius, color) {
            Shape.call(this, point, color);
            if (!validateRadius(this._radius)) {
                throw new Error("Circle radius should be positive number!");
            }
            this._type = "Circle";
            this._radius = radius;
            self = this;
        }

        Circle.prototype = new Shape();

        function getRadius() {
            return this._radius;
        }

        Circle.prototype = {
            getRadius: getRadius,
            getParametersControls: function () {
                var controls = Shape.prototype.getParametersControls.call();

                var lblRadius = document.createElement("label");
                lblRadius.setAttribute("for", "radius");
                lblRadius.innerHTML = "Radius";
                controls.push(lblRadius);

                var inputRadius = document.createElement("input");
                inputRadius.setAttribute("type", "text");
                inputRadius.id = "radius";
                controls.push(inputRadius);

                return controls;
            },
            draw: function (drawingBoard) {
                var ctx = drawingBoard.getContext("2d");
                ctx.beginPath();
                ctx.fillStyle = this._color;
                ctx.arc(this._point.getX(),
                    this._point.getY(),
                    this.getRadius(),
                    0,
                    2 * Math.PI);

                ctx.stroke();
                ctx.closePath();
                ctx.fill();
            },
            toString: function () {
                var circleStr = Shape.prototype.toString.call(this);
                circleStr += ", Radius: " + this._radius;
                return circleStr;
            }
        };

        return Circle;
    }());

    var Rectangle = (function () {
        function Rectangle(point, color, width, height) {
            Shape.call(this, point, color);
            this._type = "Rectangle";
            this._width = width;
            this._height = height;
        }

        Rectangle.prototype = new Shape();

        function getWidth() {
            return this._width;
        }

        function getHeight() {
            return this._height;
        }

        Rectangle.prototype = {
            getWidth: getWidth(),
            getHeight: getHeight(),
            getParametersControls: function () {
                var controls = Shape.prototype.getParametersControls.call();

                var lblWidth = document.createElement("label");
                lblWidth.setAttribute("for", "width");
                lblWidth.innerHTML = "Width";
                controls.push(lblWidth);

                var inputWidth = document.createElement("input");
                inputWidth.setAttribute("type", "text");
                inputWidth.id = "width";
                controls.push(inputWidth);

                var lblHeight = document.createElement("label");
                lblHeight.setAttribute("for", "height");
                lblHeight.innerHTML = "Height";
                controls.push(lblHeight);

                var inputHeight = document.createElement("input");
                inputHeight.setAttribute("type", "text");
                inputHeight.id = "height";
                controls.push(inputHeight);

                return controls;
            },
            draw: function draw(drawingBoard) {
                var ctx = drawingBoard.getContext("2d");
                ctx.beginPath();
                ctx.fillStyle = this._color;
                ctx.fillRect(this._point.getX(),
                    this._point.getY(),
                    this._width,
                    this._height);
                ctx.closePath();
                ctx.fill();
            },
            toString: function () {
                var rectStr = Shape.prototype.toString.call(this);
                rectStr += ", Width: " + this._width + ", Height: " + this._height;
                return rectStr;
            }
        }

        return Rectangle;
    }());

    var Triangle = (function () {
        function Triangle(firstPoint, secondPoint, thirdPoint, color) {
            Shape.call(this, firstPoint, color);
            this._type = "Triangle";
            this._secondPoint = secondPoint;
            this._thirdPoint = thirdPoint;
        }

        function getFirstPoint() {
            return Shape.prototype.getPoint();
        }

        function getSecondPoint() {
            return this._secondPoint;
        }

        function getThirdPoint() {
            return this._thirdPoint;
        }

        function validateTriangle() {
            //TODO: validate if the given points can build a triangle
        }

        Triangle.prototype = new Shape();
        Triangle.prototype = {
            getFirstPoint: getFirstPoint(),
            getSecondPoint: getSecondPoint(),
            getThirdPoint: getThirdPoint(),
            getParametersControls: function () {
                var controls = Shape.prototype.getParametersControls.call();

                var lblX2 = document.createElement("label");
                lblX2.setAttribute("for", "x2");
                lblX2.innerHTML = "X2";
                controls.push(lblX2);

                var inputX2 = document.createElement("input");
                inputX2.setAttribute("type", "text");
                inputX2.id = "x2";
                controls.push(inputX2);

                var lblY2 = document.createElement("label");
                lblY2.setAttribute("for", "y2");
                lblY2.innerHTML = "Y2";
                controls.push(lblY2);

                var inputY2 = document.createElement("input");
                inputY2.setAttribute("type", "text");
                inputY2.id = "y2";
                controls.push(inputY2);

                var lblX3 = document.createElement("label");
                lblX3.setAttribute("for", "x3");
                lblX3.innerHTML = "X3";
                controls.push(lblX3);

                var inputX3 = document.createElement("input");
                inputX3.setAttribute("type", "text");
                inputX3.id = "x3";
                controls.push(inputX3);

                var lblY3 = document.createElement("label");
                lblY3.setAttribute("for", "y3");
                lblY3.innerHTML = "Y3";
                controls.push(lblY3);

                var inputY3 = document.createElement("input");
                inputY3.setAttribute("type", "text");
                inputY3.id = "y3";
                controls.push(inputY3);

                return controls;
            },
            draw: function draw(drawingBoard) {
                var ctx = drawingBoard.getContext("2d");
                ctx.fillStyle = this._color;
                ctx.beginPath();
                ctx.moveTo(this._point._x,this._point._y);
                ctx.lineTo(this._secondPoint._x,this._secondPoint._y);
                ctx.lineTo(this._thirdPoint._x,this._thirdPoint._y);
                ctx.fill();
                ctx.closePath();
            },
            toString: function () {
                var triangleStr = Shape.prototype.toString.call(this);
                triangleStr += ", X2: " + this._secondPoint.getX() + ", Y2: " + this._secondPoint.getY()
                    + ", X3: " + this._thirdPoint.getX() + ", Y3: " + this._thirdPoint.getY();
                return triangleStr;
            }
        }

        return Triangle;

    }());

    var Segment = (function () {
        function Segment(firstPoint, secondPoint, color) {
            Shape.call(this, firstPoint, color);
            this._type = "Segment";
            this._secondPoint = secondPoint;
            this._color = color;
        }

        Segment.prototype = new Shape();
        Segment.prototype = {
            getParametersControls: function () {
                var controls = Shape.prototype.getParametersControls.call();

                var lblX2 = document.createElement("label");
                lblX2.setAttribute("for", "x2");
                lblX2.innerHTML = "X2";
                controls.push(lblX2);

                var inputX2 = document.createElement("input");
                inputX2.setAttribute("type", "text");
                inputX2.id = "x2";
                controls.push(inputX2);

                var lblY2 = document.createElement("label");
                lblY2.setAttribute("for", "y2");
                lblY2.innerHTML = "Y2";
                controls.push(lblY2);

                var inputY2 = document.createElement("input");
                inputY2.setAttribute("type", "text");
                inputY2.id = "y2";
                controls.push(inputY2);

                return controls;
            },
            draw: function draw(drawingBoard) {
                var ctx = drawingBoard.getContext("2d");
                ctx.strokeStyle = this._color;
                ctx.beginPath();
                ctx.moveTo(this._point._x,this._point._y);
                ctx.lineTo(this._secondPoint._x,this._secondPoint._y);
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            },
            toString: function toString() {
                var segmentStr = Shape.prototype.toString.call(this);
                segmentStr += ", X2: " + this._secondPoint.getX() + ", Y2: " + this._secondPoint.getY();
                return segmentStr;
            }
        }

        return Segment;
    }());

    // Module returned objects
    return{
        Point: Point,
        Shape: Shape,
        Circle: Circle,
        Rectangle: Rectangle,
        Triangle: Triangle,
        Segment: Segment
    }
}());

var Utils = (function () {
    var Color = (function () {
        function Color(r, g, b) {
            // TODO: Validate values of the color components (0 - 255)
            this._r = r;
            this._g = g;
            this._b = b;
        }

        function compToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        function colorToHex() {
            var colorStr = "#" + compToHex(this._r) + compToHex(this._g) + compToHex(this._b);
            return colorStr.toUpperCase();
        }

        Color.prototype = {
            toHex: colorToHex
        }

        return Color;
    }());

    return {
        Color: Color
    }
}());

// TESTS
//var color = new Utils.Color(54, 16, 28);
//console.log(color.toHex());
//
//var point = new Shapes.Shape(2, 3);
//point.draw();
//
//var shape = new Shapes.Shape(new Shapes.Point(2, 3), "#252627");
//shape.draw();
//console.log(shape.toString());
//
//var circle = new Shapes.Circle(new Shapes.Point(4, 5), 22, "#585456");
//circle.draw();
//console.log(circle.toString());
//
//var rect = new Shapes.Rectangle(new Shapes.Point(6, 7), "#151515", 220, 330);
//rect.draw();
//console.log(rect.toString());
//
//var triangle = new Shapes.Triangle(
//    new Shapes.Point(6, 7),
//    new Shapes.Point(9, 100),
//    new Shapes.Point(8, 15),
//    "#151515");
//triangle.draw();
//console.log(triangle.toString());
//
//var segment = new Shapes.Segment(
//    new Shapes.Point(9, 10),
//    new Shapes.Point(8, 15),
//    "#151515");
//segment.draw();
//console.log(segment.toString());


