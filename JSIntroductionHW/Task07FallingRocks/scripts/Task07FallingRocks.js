var fallingElements = new Array(10);

window.onload = onLoadHandler;

function onLoadHandler() {
    gameField = document.getElementById("game-field");

    createFallingElement();

}
function createFallingElement() {
    var el = document.createElement('div');
    el.className = 'shit';
    el.style.left = 720 + 'px';
    el.style.top = -20 +'px';
    gameField.appendChild(el);
}