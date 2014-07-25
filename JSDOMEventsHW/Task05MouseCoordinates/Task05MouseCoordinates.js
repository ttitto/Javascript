function onmouseOverHandler(event) {
    var ev = event || window.event;
    var printArea = document.getElementById('printarea');
    var target = ev.target || ev.srcElement;
    var time = new Date();
    printArea.textContent = 'X: ' + ev.clientX + '; Y: ' + ev.clientY + ' Time:  ' + time + '\n' +printArea.textContent ;
}
document.onmousemove = onmouseOverHandler;