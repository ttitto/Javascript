var GeometryApi = (function () {
    var self;

    function GeometryApi(areaId) {
        this._possibleShapes = ["Point", "Segment", "Triangle", "Rectangle", "Circle"];
        this._shapesToDraw = [];
        this._drawingField = document.querySelector(areaId);
        self = this;
    }

    function getShapeFromString(shapeType) {
        var shapeInstance;
        shapeType = shapeType === "Point" ? "Shape" : shapeType;
        shapeInstance = new Shapes[shapeType]();
        return shapeInstance;
    }

    GeometryApi.prototype = {
        populatePossibleShapes: function populatePossibleShapes(hostSelector) {
            var host = document.querySelector(hostSelector);
            this._possibleShapes.forEach(function (shapeStr) {
                var optElement = document.createElement("option");
                optElement.value = shapeStr;
                optElement.text = shapeStr;
                host.appendChild(optElement);
            });
        },

        populatePresentShapes: function () {
            var selectContainer = document.querySelector("#current-shapes");
            selectContainer.innerHTML = "";
            self._shapesToDraw.forEach(
                function (shape) {
                    var optEl = document.createElement("option");
                    var shapeStr = shape.toString();
                    optEl.text = shapeStr;
                    optEl.value = shapeStr;
                    selectContainer.appendChild(optEl);
                });
        },

        attachShapeListChangeEvent: function () {
            var shapeList = document.querySelector("#shape-list");
            shapeList.addEventListener("change",
                function () {
                    self.loadParameterControls.call(this, "#params-inputs", self.getShapeType());
                });
        },

        attachAddShapeClickEvent: function () {
            var addShapeButton = document.querySelector("#add-shape-button");

            addShapeButton.addEventListener("click",
                function () {
                    self.addShape.call(this, self.createShape(self.getShapeType()));
                    self.drawShapes();
                });
        },

        attachRemoveShapeClickEvent: function () {
            var removeShapeButton = document.querySelector("#remove-shape-button");

            removeShapeButton.addEventListener("click",
                function () {
                    self.removeShape.call(this);
                    self.drawShapes();
                });
        },

        attachUpMoveShapeClickEvent: function () {
            var upMoveButton = document.querySelector("#up-button");

            upMoveButton.addEventListener("click",
                function () {
                    self.moveShapeUpward.call(this);
                    self.populatePresentShapes.call(this);
                    self.drawShapes.call(this);
                });
        },

        attachDownMoveShapeClickEvent: function () {
            var downMoveButton = document.querySelector("#down-button");

            downMoveButton.addEventListener("click",
                function () {
                    self.moveShapeDownward.call(this);
                    self.populatePresentShapes.call(this);
                    self.drawShapes.call(this);
                });
        },

        getShapeType: function () {
            var shapeType,
                shapeList = document.querySelector("#shape-list");

            shapeType = shapeList.options[shapeList.selectedIndex].value;
            return shapeType;
        },

        loadParameterControls: function loadParameterControls(hostSelector, shapeType) {
            var host = document.querySelector(hostSelector);

            var shape = getShapeFromString(shapeType);
            while (host.firstChild) {
                host.removeChild(host.firstChild);
            }

            shape.getParametersControls().forEach(function (control) {
                host.appendChild(control);
            });
        },

        createShape: function createShape(shapeType) {
            var shape,
                color = document.querySelector('input[type="color"]').value,
                x1 = document.querySelector("#x1").value,
                y1 = document.querySelector("#y1").value;
            switch (shapeType) {
                case "Point":
                    shape = new Shapes.Shape(new Shapes.Point(x1, y1), color);
                    break;
                case "Segment":
                    var x2 = document.querySelector("#x2").value;
                    var y2 = document.querySelector("#y2").value;
                    shape = new Shapes.Segment(new Shapes.Point(x1, y1), new Shapes.Point(x2, y2), color);
                    break;
                case "Triangle":
                    x2 = document.querySelector("#x2").value;
                    y2 = document.querySelector("#y2").value;
                    var x3 = document.querySelector("#x3").value;
                    var y3 = document.querySelector("#y3").value;
                    shape = new Shapes.Triangle(new Shapes.Point(x1, y1),
                        new Shapes.Point(x2, y2),
                        new Shapes.Point(x3, y3),
                        color);
                    break;
                case "Rectangle":
                    var width = document.querySelector("#width").value;
                    var height = document.querySelector("#height").value;
                    shape = new Shapes.Rectangle(new Shapes.Point(x1, y1),
                        color,
                        width,
                        height);
                    break;
                case "Circle":
                    var radius = document.querySelector("#radius").value;
                    shape = new Shapes.Circle(new Shapes.Point(x1, y1), radius, color);
                    break;

                default :
                    throw  new Error("Shape not created because shape type not found!");
                    break;
            }

            return shape;
        },

        addShape: function (shape) {
            var shapesContainer,
                optionElement,
                shapeStr;

            self._shapesToDraw.push(shape);
            shapeStr = shape.toString();
            shapesContainer = document.querySelector("#current-shapes");

            optionElement = document.createElement("option");
            optionElement.value = shapeStr;
            optionElement.text = shapeStr;
            shapesContainer.appendChild(optionElement);
        },

        removeShape: function removeShape() {
            var shapesContainer = document.querySelector("#current-shapes"),
                index = shapesContainer.selectedIndex;

            self._shapesToDraw.splice(index, 1);
            shapesContainer.removeChild(shapesContainer.options[index]);
        },

        drawShapes: function () {
            var canvasEl = document.querySelector("#drawing-field");
            var width = canvasEl.getAttribute("width");
            var height = canvasEl.getAttribute("height");
            canvasEl.getContext('2d').clearRect(0, 0, width, height);
            self._shapesToDraw.forEach(
                function (shape) {
                    shape.draw(canvasEl);
                }
            );
        },

        moveShapeUpward: function rearrangeShapes() {
            var selectContainer = document.querySelector("#current-shapes");
            var selectedIndex = selectContainer.selectedIndex;

            if (selectedIndex >= 0) {
                var selectedShape = self._shapesToDraw[selectedIndex];

                if (selectedIndex > 0) {
                    self._shapesToDraw.splice(selectedIndex, 1);
                    self._shapesToDraw.splice(selectedIndex - 1, 0, selectedShape);
                }
            }
        },

        moveShapeDownward: function () {
            var selectContainer = document.querySelector("#current-shapes");
            var selectedIndex = selectContainer.selectedIndex;

            if (selectedIndex >= 0) {
                var selectedShape = self._shapesToDraw[selectedIndex];

                if (selectedIndex < self._shapesToDraw.length - 1) {
                    self._shapesToDraw.splice(selectedIndex, 1);
                    self._shapesToDraw.splice(selectedIndex + 1, 0, selectedShape);
                }
            }
        }
    }

    return GeometryApi;
}());

window.onload = function () {
    var api = new GeometryApi("#params-inputs");
    api.populatePossibleShapes("#shape-list");
    api.loadParameterControls("#params-inputs", "Shape");
    api.attachShapeListChangeEvent();
    api.attachAddShapeClickEvent();
    api.attachRemoveShapeClickEvent();
    api.attachUpMoveShapeClickEvent();
    api.attachDownMoveShapeClickEvent();
};
