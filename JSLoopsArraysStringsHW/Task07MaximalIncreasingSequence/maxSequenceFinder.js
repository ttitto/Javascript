function findMaxSequence(value) {
    var maxSeq = [value[0]];
    var currentSeq = [value[0]];
    for (var i = 1; i < value.length; i++) {
        if (value[i] > currentSeq[currentSeq.length - 1]) {
            currentSeq.push(value[i]);
            if (maxSeq.length < currentSeq.length) {
                maxSeq = currentSeq;
            }
        } else {
            currentSeq = [value[i]];
        }
    }
    if (maxSeq.length <= 1) {
        return 'no';
    }
    return maxSeq;
}
console.log(findMaxSequence([3, 2, 3, 4, 2, 2, 4]));
console.log(findMaxSequence([3, 5, 4, 6, 1, 2, 3, 6, 10, 32]));
console.log(findMaxSequence([3, 2, 1]));