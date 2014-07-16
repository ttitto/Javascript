
document.getElementById("eval").onclick=assignResult;
function calcExpression(){

    return eval(clearExpression());
}
function clearExpression(){
    var input=document.getElementById("input").value;
    //solution with regular expressions -- doesn't handle the situation where two signs follow one after the other
   var rgx=/[0-9+-/*]*[0-9+-/*]*/g;
      var match=input.match(rgx);
    var result=match.join('');

    //automat solution
    var digits=[1,2,3,4,5,6,7,8,9];
    var signs=["/","*","-","+"];
    var parenth=["(",")"];
    var sign=false;

    var result="";
   for(var i=0;i<input.length;i++){
if(digits.contains(parseInt(input[i])) || parenth.contains(input[i]) ) {
    result+=input[i];
    sign=false;
} else if(signs.contains(input[i])){
    if(sign==false){
        result+=input[i];
        sign=true;
    } else{
        sign=false;
    }
}
   }

    alert(result);
    return result;
}
function assignResult(){
    document.getElementById("result").innerHTML=calcExpression();
}