function findNthDigit(value) {
    var cnt = value[0];
    var number = value[1].toString();
    var counter = 0;
    for (var i = number.length; i >= 0; i--) {
        if (isNumeric(number[i])) {
            counter++;
        }
        if (counter == cnt) {
            return convertDigitToWord(parseInt(number[i]));
        }
    }
    return 'The number doesn’t have ' + cnt + ' digits';
}
function isNumeric(str) {
    return /^\d+$/.test(str);
}

function convertDigitToWord(value) {
    switch (value) {
        case 0:
            return "Zero";
        case 1:
            return "One";
        case 2:
            return "Two";
        case 3:
            return "Three";
        case 4:
            return "Four";
        case 5:
            return "Five";
        case 6:
            return "Six";
        case 7:
            return "Seven";
        case 8:
            return "Eight";
        case 9:
            return "Nine";
        default:
            return false;
    }
}

console.log(findNthDigit([1, 6]));
console.log(findNthDigit([2, -55]));
console.log(findNthDigit([6, 923456]));
console.log(findNthDigit([3, 1451.78]));
console.log(findNthDigit([6, 888.88]));