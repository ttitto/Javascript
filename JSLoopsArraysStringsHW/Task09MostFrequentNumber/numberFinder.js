function findMostFreqNum(value) {
    var occurrences = {};
    var len = value.length;
    var maxInd = 1;
    for (var i = 0; i < len; i++) {
        if (typeof  ( occurrences[value[i]]) == 'undefined') {
            occurrences[value[i]] = 1;
        } else {
            occurrences[value[i]]++;
            if (occurrences[maxInd] < occurrences[value[i]]) {
                maxInd = value[i];
            }
        }
    }
    return maxInd + " (" + occurrences[maxInd] + " times)";
}

console.log(findMostFreqNum([ 4, 1, 1, 4, 2, 3, 4, 4, 1, 2, 4, 9, 3 ]));
console.log(findMostFreqNum([ 2, 1, 1, 5, 7, 1, 2, 5, 7, 3, 87, 2, 12, 634, 123, 51, 1 ]));
console.log(findMostFreqNum([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]));