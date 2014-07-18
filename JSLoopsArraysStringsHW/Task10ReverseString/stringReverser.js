function reverseString(value) {
    var resultStr = '';
    for (var i = value.length - 1; i >= 0; i--) {
        resultStr += value[i];
    }
    return resultStr;
}
console.log(reverseString('sample'));
console.log(reverseString('softUni'));
console.log(reverseString('java script'));