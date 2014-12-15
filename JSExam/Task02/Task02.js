function solve(args) {
    var i = 0;
    var myArr = [];
    var resultArr = [];
    while (typeof (args[i]) !== 'undefined') {
        myArr.push(args[i].split(''));
        resultArr.push(args[i].split(''));
        i++;
    }

    for (var r = 0; r < myArr.length; r++) {
        for (var c = 0; c < myArr[r].length; c++) {
            var ch = myArr[r][c];
            if (typeof (myArr[r + 1]) !== 'undefined' && typeof ( myArr[r + 1][c - 1] ) !== 'undefined' &&
                typeof (myArr[r + 1][c]) !== 'undefined' && typeof (myArr[r + 1][c + 1]) !== 'undefined' &&

                myArr[r + 1][c - 1] == ch && myArr[r + 1][c] == ch && myArr[r + 1][c + 1] == ch) {
                resultArr[r][c] = '*';
                resultArr[r + 1][c - 1] = '*';
                resultArr[r + 1][c] = '*';
                resultArr[r + 1][c + 1] = '*';
            }
        }
    }

    //print result array
    for (var r = 0; r < resultArr.length; r++) {
        console.log(resultArr[r].join(''));
    }
    //console.log(resultArr);
}//end of solve function

solve(['abcdexgh', 'bbbdxxxh', 'abcxxxxx']);