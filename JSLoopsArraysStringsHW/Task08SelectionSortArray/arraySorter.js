//SELECTION SORT ALGORITHM
function sortArray(value) {
    var i;
    var smIndex = 0;
    var smNum = value[0];
    var resultArr = [];
    //loop through all elements and find smallest number and its index
    for (i = 1; i < value.length; i++) {
        if (value[i] < value[i - 1]) {
            smNum = value[i];
            smIndex = i;
        }
        if (i == value.length - 1) {
            //add smallest index at the end of a new array
            resultArr.push(smNum);
            //remove the smallest number from the initial array
            value.splice(smIndex, 1);
            i = 0;
            smNum = value[0];
            smIndex = 0;
        }
    }
    return resultArr.join(' ');
}
console.log(sortArray([5, 4, 3, 1, 2, 1]));
console.log(sortArray([12, 12, 50, 6, 2, 22, 51, 712, 6, 3, 3]));