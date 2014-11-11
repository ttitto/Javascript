var someFigures = (function () {
    var ctx = document.getElementById('the-canvas').getContext('2d');

    var CanvasUtils = (function () {

        function drawEllipse(context, x, y, radius, scaleX, scaleY, startAngle, endAngle) {
            context.save();
            context.beginPath();
            context.scale(scaleX, scaleY);
            context.arc(x / scaleX, y / scaleY, radius, startAngle, endAngle);
            context.fill();
            context.stroke();
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
            CanvasUtils.drawEllipse(ctx, sx, 254, 114, 1, 0.85, 0, 2 * Math.PI);

            // mouth
            ctx.save();
            ctx.rotate(8 * Math.PI/180);
            CanvasUtils.drawEllipse(ctx, 150, 285, 42, 1, 0.35, 0, 2 *Math.PI);
            ctx.restore();
            CanvasUtils.drawPolygone(ctx, [107, 217, 83, 267, 107, 267], false, false, true);

            // eyes
            CanvasUtils.drawEllipse(ctx, 64, 217, 20, 1, 0.65, 0, 2 * Math.PI);
            CanvasUtils.drawEllipse(ctx, 154, 217, 20, 1, 0.65, 0, 2 * Math.PI);
            ctx.fillStyle = '#22545F';
            CanvasUtils.drawEllipse(ctx, 60, 217, 8, 0.6, 1, 0, 2 * Math.PI);
            CanvasUtils.drawEllipse(ctx, 146, 217, 8, 0.6, 1, 0, 2 * Math.PI);


            ctx.strokeStyle = 'black';
            ctx.fillStyle = '#396693';

            // cyllinder
            CanvasUtils.drawEllipse(ctx, sx - 7, 165, 125, 1, 0.188, 0, 2 * Math.PI);

            ctx.fillRect(69, 25, 130, 119);
            ctx.strokeRect(69, 25, 130, 119);

            CanvasUtils.drawEllipse(ctx, sx, 24, 65, 1, 0.34, 0, 2 * Math.PI);
            CanvasUtils.drawEllipse(ctx, sx, 141, 65, 1, 0.34, 0, Math.PI);


        }
    }());

    var drawingApi = (function () {
        Gentleman.drawGentleman(ctx);

    }());
}());