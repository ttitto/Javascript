function checkDigit(value) {
    var thirdDigit = Math.floor((value / Math.pow(10, 2)) % 10);
    return thirdDigit == 3;
}
console.log(checkDigit(1235));
console.log(checkDigit(25368));
console.log(checkDigit(123456));
