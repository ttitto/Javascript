function reverseWordsInString(str) {
    var words = str.split(' ');
    var resultStr = '';
    for (var w in words) {
        resultStr += words[w].reverse() + ' ';
    }
    return resultStr;
}

String.prototype.reverse = function () {
    var resultArr = [];
    var len = this.length;
    for (var i = 0; i < len / 2; i++) {
        resultArr[i] = this[len - 1 - i];
        resultArr[len - i - 1] = this[i];
    }
    return resultArr.join('');
};
console.log(reverseWordsInString('Hello, how are you.'));
console.log(reverseWordsInString('Life is pretty good, isn’t it?'));