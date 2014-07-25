function biggerThanNeighbors(index, arr) {
    if (typeof (arr[index]) == 'undefined') {
        return 'invalid index';
    }
    if (typeof (arr[index - 1]) == 'undefined' || typeof (arr[index + 1]) == 'undefined') {
        return 'only one neighbor';
    } else if (arr[index] > arr[index - 1] && arr[index] > arr[index + 1]) {
        return 'bigger';
    } else return 'not bigger';
}

console.log(biggerThanNeighbors(2, [1, 2, 3, 3, 5]));
console.log(biggerThanNeighbors(2, [1, 2, 5, 3, 4]));
console.log(biggerThanNeighbors(5, [1, 2, 5, 3, 4]));
console.log(biggerThanNeighbors(0, [1, 2, 5, 3, 4]));