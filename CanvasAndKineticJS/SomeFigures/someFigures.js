var someFigures = (function () {
    var ctx = document.getElementById('the-canvas').getContext('2d');
    var Gentleman = (function () {
        var sx = 134,
            sy = 77;

        return {
            drawGentleman: drawGentleman
        };

        function drawGentleman(ctx) {

            ctx.strokeStyle = '#22545F';
            ctx.fillStyle = '#90CAD7';
            ctx.lineWidth = 3;

            ctx.save();
            ctx.beginPath();
            ctx.scale(1, 0.94);
            ctx.arc(sx, 263, 114, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.restore();
            ctx.strokeStyle = 'black';
            ctx.fillStyle = '#396693';

            ctx.beginPath();
            ctx.rect(69, 25, 130, 119);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.save();
            ctx.beginPath();
            ctx.scale(1, 0.34);
            ctx.arc(sx, sy, 65, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(sx, 417, 65, 0, Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.scale(1, 0.188);
            ctx.lineWidth = 15;
            ctx.arc(sx - 7, 2070, 125, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
//
//            ctx.fill();
//            ctx.stroke();

        }
    }());

    var drawingApi = (function () {
        Gentleman.drawGentleman(ctx);

    }());
}());