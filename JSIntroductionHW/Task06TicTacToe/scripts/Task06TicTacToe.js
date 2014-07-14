function onClickHandler(event){
    var eTarget=event.target || event.srcElement;

    alert(eTarget.id);
    function getClickedId(){
        return eTarget.id;
    }
}
function onLoadHandler(event){
    document.getElementsByName('div').onclick=onClickHandler(event);
}

function a (){
    window.onload=onLoadHandler;
}