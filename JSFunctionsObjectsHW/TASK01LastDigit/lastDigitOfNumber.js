function findLastDigit(number) {
    var digit = number % 10;
    if (digit < 0) {
        digit *= -1;
    }
    return convertDigitToWord(digit);
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
    }
}

console.log(findLastDigit(6));
console.log(findLastDigit(-55));
console.log(findLastDigit(133));
console.log(findLastDigit(14567));