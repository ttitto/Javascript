document.getElementById("eval").onclick = assignResult;
Array.prototype.contains = function (v) {
    return this.indexOf(v) > -1;
}
function calcExpression() {

    return eval(clearExpression());
}
function clearExpression() {
    var input = document.getElementById("input").value;
//    //solution with regular expressions -- doesn't handle the situation where two signs follow one after the other
//   var rgx=/[0-9+-/*]*[0-9+-/*]*/g;
//      var match=input.match(rgx);
//    var result=match.join('');

    //automat solution
    var digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var signs = ["/", "*", "-", "+"];
    var parenth = ["(", ")"];
    var sign = false;

    var result = "";
    for (var i = 0; i < input.length; i++) {
        if (digits.contains(parseInt(input[i])) || parenth.contains(input[i])) {
            result += input[i];
            sign = false;
        } else if (signs.contains(input[i])) {
            if (sign == false) {
                result += input[i];
                sign = true;
            } else {
                sign = false;
            }
        }
    }
    for (var i = result.length - 1; i >= 0; i--) {
        if (result[i] == "(" || signs.contains(result[i]) ||
            (result[i] == ')' && signs.contains(result[i - 1])) ||
            (result[i] == ')' && result[i - 1] == "(")) {
            result = result.substring(0, i);
        } else {
            break;
        }
    }

    alert(result);
    return result;
}

function assignResult() {
    document.getElementById("result").innerHTML = calcExpression();
}