function findLargestBySumOfDigits(nums) {
    var numbs = arguments;
    var sum = 0;
    var maxNum;

    for (var num in numbs) {
        var current = numbs[num].toString();
        if (!/^[\s\+\-]{0,1}\d+$/.test(current)) {
            return 'undefined';
        } else {
            var localSum = 0;
            for (var dig in current) {
                if (current[dig] == '-' || current[dig] == '+') {
                    continue;
                }
                localSum += parseInt(current[dig]);
            }
        }
        if (localSum > sum) {
            sum = localSum;
            maxNum = current;
        }
    }
    return maxNum;
}

console.log(findLargestBySumOfDigits(5, 10, 15, 111));
console.log(findLargestBySumOfDigits(33, 44, -99, 0, 20));
console.log(findLargestBySumOfDigits('hello'));
console.log(findLargestBySumOfDigits(5, 3.3));
