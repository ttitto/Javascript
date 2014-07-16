/**
 * Created by ttitto on 16.7.14.
 */
window.onload = function () {

    //get the element to be moved
    var movedImg = document.getElementById("move");
    movedImg.style.top = "0";
    movedImg.style.left = "0";
    var objLeft;
    var objTop;
    var xCurrMouse;
    var yCurrMouse;

    //assign event handlers
    document.onmousedown = setCoords;
    document.onmouseup = mouseUp;

    //set the coordinates values
    function setCoords(event) {
        if (event == null) {
            event = window.event;
        }
        var sender = event.target || event.srcElement;
        if (sender.id == "move") {
            //set image coordinates
            objLeft = parseInt(movedImg.style.left);
            objTop = parseInt(movedImg.style.top);
            //set current mouse coordinates
            xCurrMouse = event.clientX;
            yCurrMouse = event.clientY;

            //assign event handler for mouse movement
            document.onmousemove = moveImage;
        }
        return false;
    }

    function moveImage(event) {
        if (event == null) {
            event = window.event;
        }

        movedImg.style.left = parseInt(objLeft - xCurrMouse + event.clientX) + "px";
        movedImg.style.top = parseInt(objTop - yCurrMouse + event.clientY) + "px";
    }

    function mouseUp(event) {
        document.onmousemove = null;
    }

}
