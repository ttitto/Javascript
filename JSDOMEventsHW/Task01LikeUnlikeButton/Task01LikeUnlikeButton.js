function assignClickHandler() {
    var button = document.getElementById('myButton');
    button.onclick = onButtonClick;
}
function onButtonClick(event) {
    event = event || window.event;
    var clickedEl = event.target || event.srcElement;
    //toggle button innerText
    if (clickedEl.innerText == 'Like' || clickedEl.textContent == 'Like') {
        clickedEl.innerText = 'Unlike';
        clickedEl.textContent = 'Unlike';
    } else if (clickedEl.innerText == 'Unlike' || clickedEl.textContent == 'Unlike') {
        clickedEl.innerText = 'Like';
        clickedEl.textContent = 'Like';
    }
}
assignClickHandler();