function solve(args) {
    var start = parseInt(args[0]);
    var end = parseInt(args[1]);
    var resultStr = '<table>\n<tr><th>Num</th><th>Square</th><th>Fib</th></tr>\n';
    for (var i = start; i <= end; i++) {
        resultStr += '<tr><td>' + i + '</td><td>' + (i * i) + '</td><td>' + isFib(i) + '</td></tr>\n';

        if (i == end) {
            resultStr += '</table>';
        }
    }

    console.log(resultStr);
//    return resultStr;
    function isFib(num) {

        if (num == 0) {
            return 'yes';
        }
        var expr = (Math.sqrt(5 * num * num - 4) % 1) == 0 || (Math.sqrt(5 * num * num + 4) % 1) == 0;
        if (expr) {
            return 'yes';
        } else {
            return 'no';
        }

    }
}//end solve function

solve([2, 6]);
solve([55, 56]);