var sign = "cross";// sets initial sign value
var patternX;
var patternY;
window.onload = onLoadHandler;

function onClickHandler(event) {
    var eTarget = event.target || event.srcElement;
    var el = eTarget;
    if (!el.classList.contains("cross") && !el.classList.contains("circle")) {
        el.className += " " + sign

        if (sign == "cross") {
            patternX[parseInt(el.id)] = 1;
        }
        if (sign == "circle") {
            patternY[parseInt(el.id)] = 1;
        }

        if (CheckWin(patternX) || CheckWin(patternY)) {
            document.getElementsByClassName("game-over-message").item(0).style.display = "block";
            document.getElementById("game").style.opacity = "0.15";
        }

        toggleSign();
    }

}
function CheckWin(pattern) {

    if ((pattern[0] == 1 && pattern[1] == 1 && pattern[2] == 1) ||
        (pattern[3] == 1 && pattern[4] == 1 && pattern[5] == 1) ||
        (pattern[6] == 1 && pattern[7] == 1 && pattern[8] == 1) ||
        (pattern[0] == 1 && pattern[3] == 1 && pattern[6] == 1) ||
        (pattern[1] == 1 && pattern[4] == 1 && pattern[7] == 1) ||
        (pattern[2] == 1 && pattern[5] == 1 && pattern[8] == 1) ||
        (pattern[0] == 1 && pattern[4] == 1 && pattern[8] == 1) ||
        (pattern[2] == 1 && pattern[4] == 1 && pattern[6] == 1)) {
        return true;
    } else {
        return false;
    }
}

function toggleSign() {
    if (this.sign == "cross") {
        this.sign = "circle";
    } else {
        this.sign = "cross";
    }
}

function onLoadHandler() {
    //attach onclick events on the cells
    var elements = document.getElementsByClassName("cell");

    for (var i = 0; i < elements.length; i++) {
        var el = elements.item(i);
        if (el.addEventListener) {
            el.addEventListener("click", onClickHandler, false);
        }
        else {
            el.attachEvent("onclick", onClickHandler)
        }
    }

    //Initialize pattern arrays
    this.patternX = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.patternY = [0, 0, 0, 0, 0, 0, 0, 0, 0];

}

