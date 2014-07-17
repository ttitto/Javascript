function findMinAndMax(value) {
    var min = Number.MAX_VALUE;
    var max = Number.MIN_VALUE;
    for (var item in value) {
        item = value[item];
        if (item < min) {
            min = item;
        }
        if (item > max) {
            max = item;
        }
    }
    return "Min -> " + min + "\nMax -> " + max;
}
console.log(findMinAndMax([1, 2, 1, 15, 20, 5, 7, 31]));
console.log(findMinAndMax([2, 2, 2, 2, 2]));
console.log(findMinAndMax([500, 1, -23, 0, -300, 28, 35, 12]));