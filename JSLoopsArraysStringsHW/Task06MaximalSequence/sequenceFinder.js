function findMaxSequence(value) {
    var maxSeq = [value[0]];
    var currentSeq = [value[0]];
    for (var i = 1; i < value.length; i++) {
        if (value[i] === currentSeq[0]) {
            currentSeq.push(value[i]);
            if (maxSeq.length <= currentSeq.length) {
                maxSeq = currentSeq;
            }
        } else {
            currentSeq = [value[i]];
        }
    }
    return maxSeq;
}
console.log(findMaxSequence([2, 1, 1, 2, 3, 3, 2, 2, 2, 1]));
console.log(findMaxSequence(['happy']));
console.log(findMaxSequence([2, 'qwe', 'qwe', 3, 3, '3']));