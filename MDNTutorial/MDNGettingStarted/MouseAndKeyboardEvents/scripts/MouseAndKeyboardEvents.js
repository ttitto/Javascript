/*catching a mouse event*/
function clickHandler(event){
    var eType=event.type;
    var eTarget=event.target || event.srcElement;

    alert("Captured element ( type: "+ eType + " target: "+ eTarget+ " )");
}

function mouseEventHandler (event) {
    if(!event) event=window.event;

    var eType=event.type;
    var eTarget= event.target || event.srcElement;

    alert("Captured element (type: "+ eType+ "target: "+eTarget +" )");

}
function onloadHandler(){
    var body=document.body;
    var span=document.createElement("span");
    span.id="example-span";
    var spanChild=document.createTextNode("Click this dynamically added span!");
    span.appendChild(spanChild);
    body.appendChild(span);

    span.onmousedown=mouseEventHandler;
    span.onmouseup=mouseEventHandler;
    span.onmouseover=mouseEventHandler;
    span.onmouseout=mouseEventHandler;
    body.onclick=clickHandler;

    document.onkeypress=keypressHandler;
    document.onkeydown=keypressHandler;
    document.onkeyup=keypressHandler;
}
/*catching a keyboard event*/
function keypressHandler(event){
    var eType=event.type;
    var keyCode=event.which?event.keyCode:event.charCode;
    var charCode=String.fromCharCode(keyCode);
    alert("Captured element (type: "+ eType+" Key code: "+keyCode+" Char Code: "+charCode);
}