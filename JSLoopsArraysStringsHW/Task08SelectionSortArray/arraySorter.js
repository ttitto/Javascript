//SELECTION SORT ALGORITHM
function sortArray(value) {
    var resultArr = [];
    var len = value.length;
    //loop through all elements and find smallest number and its index
    for (var i = 0; i < len; i++) {
        var smallest = getSmallest(value);
        //add smallest index at the end of a new array
        resultArr.push(smallest[0]);
        //remove the smallest number from the initial array
        value.splice(smallest[1], 1);
    }
    return resultArr.join(' ');
}

function getSmallest(arr) {
    var len = arr.length;
    var result = [arr[0], 0];
    for (var i = 1; i < len; i++) {
        if (arr[i] < result[0]) {
            result[0] = arr[i];
            result[1] = i;
        }
    }
    return result;
}

console.log(sortArray([ 12, 12, 50, 6, 2, 22, 51, 712, 6, 3, 3 ]));
console.log(sortArray([ 5, 4, 3, 1, 2, 12 ]));
