var someFigures = (function () {
    var ctx = document.getElementById('the-canvas').getContext('2d');
    var Gentleman = (function () {
        var sx = 100,
            sy = 100;

        function drawGentleman(ctx) {

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.fillStyle = '#396693';

            ctx.beginPath();

            ctx.rect(sx, sy, 135, 115);
            ctx.save();
            ctx.scale(1, 0.33);
            ctx.arc(sx, sy, 48, 0, 2 * Math.PI);

            ctx.restore();
            ctx.fill();
            ctx.stroke();
        }

        return {
            drawGentleman: drawGentleman
        };
    }());

    var drawingApi = (function () {
        Gentleman.drawGentleman(ctx);

    }());
}());