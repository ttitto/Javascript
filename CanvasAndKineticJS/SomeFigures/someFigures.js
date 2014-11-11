var someFigures = (function () {
    var ctx = document.getElementById('the-canvas').getContext('2d');

    var CanvasUtils = (function () {

        function drawEllipse(context, x, y, radius, scaleX, scaleY, startAngle, endAngle, isFilled, isStroked) {
            isFilled = isFilled === 'undefined' ? true : isFilled;
            isStroked = isStroked === 'undefined' ? true : isStroked;

            context.save();
            context.beginPath();
            context.scale(scaleX, scaleY);
            context.arc(x / scaleX, y / scaleY, radius, startAngle, endAngle);

            if (isFilled) {
                context.fill();
            }

            if (isStroked) {
                context.stroke();
            }

            context.restore();
        }

        function drawPolygone(context, points, isClosed, isFilled, isStroked) {
            isClosed = isClosed === 'undefined' ? false : isClosed;
            isFilled = isFilled === 'undefined' ? true : isFilled;
            isStroked = isStroked === 'undefined' ? true : isStroked;

            if (!points) {
                throw  new ReferenceError("Points array should be initialized.");
            }

            if (points.length < 1) {
                throw  new ReferenceError("Points array should contain at least one point.");
            }

            if (points.length % 2 !== 0) {
                throw  new Error("Points count should be even number");
            }

            context.save();
            context.beginPath();
            context.moveTo(points[0], points[1]);

            for (var i = 2; i < points.length; i += 2) {
                context.lineTo(points[i], points[i + 1]);
            }

            if (isClosed) {
                context.closePath();
            }

            if (isFilled) {
                context.fill();
            }

            if (isStroked) {
                context.stroke();
            }

            context.restore();
        }

        return{
            drawEllipse: drawEllipse,
            drawPolygone: drawPolygone
        }

    }());

    var Gentleman = (function () {
        var sx = 134;

        return {
            drawGentleman: drawGentleman
        };

        function drawGentleman(ctx) {

            ctx.strokeStyle = '#22545F';
            ctx.fillStyle = '#90CAD7';
            ctx.lineWidth = 5;

            // head
            CanvasUtils.drawEllipse(ctx, sx, 254, 114, 1, 0.85, 0, 2 * Math.PI, true, true);

            // mouth
            ctx.save();
            ctx.rotate(8 * Math.PI / 180);
            CanvasUtils.drawEllipse(ctx, 150, 285, 42, 1, 0.35, 0, 2 * Math.PI, true, true);
            ctx.restore();
            CanvasUtils.drawPolygone(ctx, [107, 217, 83, 267, 107, 267], false, false, true);

            // eyes
            CanvasUtils.drawEllipse(ctx, 64, 217, 20, 1, 0.65, 0, 2 * Math.PI, true, true);
            CanvasUtils.drawEllipse(ctx, 154, 217, 20, 1, 0.65, 0, 2 * Math.PI, true, true);
            ctx.fillStyle = '#22545F';
            CanvasUtils.drawEllipse(ctx, 60, 217, 8, 0.6, 1, 0, 2 * Math.PI, true, true);
            CanvasUtils.drawEllipse(ctx, 146, 217, 8, 0.6, 1, 0, 2 * Math.PI, true, true);


            ctx.strokeStyle = 'black';
            ctx.fillStyle = '#396693';

            // cyllinder
            CanvasUtils.drawEllipse(ctx, sx - 7, 165, 125, 1, 0.188, 0, 2 * Math.PI, true, true);

            ctx.fillRect(69, 25, 130, 119);
            ctx.strokeRect(69, 25, 130, 119);

            CanvasUtils.drawEllipse(ctx, sx, 24, 65, 1, 0.34, 0, 2 * Math.PI, true, true);
            CanvasUtils.drawEllipse(ctx, sx, 141, 65, 1, 0.34, 0, Math.PI, true, true);


        }
    }());

    var Bike = (function () {
        function drawBike(ctx) {
            ctx.strokeStyle = '#22545F';
            ctx.fillStyle = '#90CAD7';
            ctx.lineWidth = 5;

            CanvasUtils.drawEllipse(ctx, 446, 548, 93, 1, 1, 0, 2 * Math.PI, true, true);
            CanvasUtils.drawEllipse(ctx, 95, 548, 93, 1, 1, 0, 2 * Math.PI, true, true);

            CanvasUtils.drawPolygone(ctx, [446, 540, 415, 358, 464, 302, 415, 358, 341, 384], false, false, true);
            CanvasUtils.drawPolygone(ctx,
                [253, 539, 422, 426, 203, 426, 90, 544, 253, 539, 175, 383, 212, 384, 175, 383, 136, 383], false, false, true);
            CanvasUtils.drawEllipse(ctx, 251, 539, 26, 1, 1, 0, 2 * Math.PI, false, true);
            CanvasUtils.drawPolygone(ctx, [284, 577, 268, 558], false, false, true);
            CanvasUtils.drawPolygone(ctx, [235, 520, 218, 499], false, false, true);
        }

        return {
            drawBike: drawBike
        };
    }());

    var House = (function () {
        function drawHouse(context) {
            var sx = 685,
                sy = 293;

            ctx.fillStyle = '#975B5B';
            ctx.lineWidth = 4;

            ctx.fillRect(651, 250, 450, 338);
            ctx.strokeRect(651, 250, 450, 338);

            CanvasUtils.drawPolygone(ctx, [651, 250, 876, 0, 1101, 250], true, true, true);
            CanvasUtils.drawPolygone(ctx, [965, 190, 965, 63, 1015 , 63, 1015, 190], false, true, true);
            CanvasUtils.drawEllipse(ctx, 990, 63, 25, 1, 0.35, 0, 2 * Math.PI, true, true);

            ctx.fillStyle = 'black';
            ctx.fillRect(sx, sy, 77, 49);
            ctx.fillRect(sx + 81, sy, 77, 49);
            ctx.fillRect(sx, sy + 54, 77, 49);
            ctx.fillRect(sx + 81, sy + 54, 77, 49);

            sx = sx + 219;
            ctx.fillRect(sx, sy, 77, 49);
            ctx.fillRect(sx + 81, sy, 77, 49);
            ctx.fillRect(sx, sy + 54, 77, 49);
            ctx.fillRect(sx + 81, sy + 54, 77, 49);

            sy += 142;
            ctx.fillRect(sx, sy, 77, 49);
            ctx.fillRect(sx + 81, sy, 77, 49);
            ctx.fillRect(sx, sy + 54, 77, 49);
            ctx.fillRect(sx + 81, sy + 54, 77, 49);

            CanvasUtils.drawEllipse(ctx, 746, 543, 7, 1, 1, 0, 2 * Math.PI, false, true);
            CanvasUtils.drawEllipse(ctx, 782, 543, 7, 1, 1, 0, 2 * Math.PI, false, true);
            CanvasUtils.drawPolygone(ctx,[700, 590, 700, 475], false, false, true);
            CanvasUtils.drawPolygone(ctx,[825, 590, 825, 475], false, false, true);
            CanvasUtils.drawPolygone(ctx,[763, 590, 763, 440], false, false, true);

            ctx.beginPath();
            ctx.moveTo(700, 475);
            ctx.quadraticCurveTo(730, 425, 763, 440);
            ctx.stroke();
        }

        return  {
            drawHouse: drawHouse
        }
    }());

    var drawingApi = (function () {
        Gentleman.drawGentleman(ctx);
        Bike.drawBike(ctx);
        House.drawHouse(ctx);

    }());
}());