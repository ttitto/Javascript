function calcCircleArea(r) {
    var area = Math.PI * r * r
    return area.toString();
}
function attachString(str) {
    document.body.innerText += str;
}
attachString('r=7; area=' + calcCircleArea(7) + '\n');
attachString('r=7; area=' + calcCircleArea(1.5) + '\n');
attachString('r=7; area=' + calcCircleArea(20) + '\n');