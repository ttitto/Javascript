/*ALGORITHM
*
*   change the windows limits on window.resize
*   CREATE RANDOM SITUATED particles - have initial coordinates and movement direction
*
* */
var fallingElements=new Array(10);
var gameField=document.getElementById("game-field");
window.onload=onLoadHandler;

function onLoadHandler(){
    //attach window onresize event handler
//addOnresizeEvent(window,"resize",onWindowResizeHandler);
    gameRun();
}

function gameRun(){
    generateSuns(window.innerWidth);
    drawSuns();

}

function generateSuns(posMax){
    var posX=Math.floor((Math.random() * posMax) + 1);
    fallingElements.add([0,posX]);

}
function drawSuns(){
    var el=document.createElement("div");
    el.className="sun";

    gameField.appendChild(el);
}
//function onWindowResizeHandler(){
//    //set the allowed max position of the falling blocks
//}
//function addOnresizeEvent(elem, type, eventHandle) {
//    if (elem == null || typeof(elem) == 'undefined') return;
//    if ( elem.addEventListener ) {
//        elem.addEventListener( type, eventHandle, false );
//    } else if ( elem.attachEvent ) {
//        elem.attachEvent( "on" + type, eventHandle );
//    } else {
//        elem["on"+type]=eventHandle;
//    }
//};
