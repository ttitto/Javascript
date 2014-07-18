function checkBrackets(value) {
    var len = value.length;
    var brackets = [];
    for (var i = 0; i < len; i++) {
        if (value[i] == '(') {
            brackets.push('(');
        } else if (value[i] == ')') {
            if (brackets.length < 1) {
                return 'incorrect';
            } else {
                brackets.pop();
            }
        }
    }
    if (brackets.length == 0) {
        return 'correct';
    } else {
        return 'incorrect';
    }
}

console.log(checkBrackets('( ( a + b ) / 5 – d )'));
console.log(checkBrackets(') ( a + b ) )'));
console.log(checkBrackets('( b * ( c + d *2 / ( 2 + ( 12 – c / ( a + 3 ) ) ) )'));