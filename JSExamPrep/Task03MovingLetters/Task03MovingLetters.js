function solve(args) {

    var words = args[0].split(/\s/);
    var letters = extractLetters(words).split('');
    var encoded = encodeString(letters);


    // console.log(encoded.join(''));
    return encoded.join('');
    /*FUNCTION DECLARATIONS*/
    function extractLetters(wrds) {
        var resultStr = '';
        var wCnt = wrds.length;
        var maxLen = Math.max.apply(null, wrds.map(function (a) {
            return a.length;
        }));

        for (var i = 0; i < maxLen; i++) {
            for (var j = 0; j < wCnt; j++) {
                var len = wrds[j].length;
                if (len > 0) {
                    resultStr += wrds[j][len - 1];
                    wrds[j] = wrds[j].substring(0, len - 1);
                }
            }
        }
        return resultStr;
    }

    function encodeString(ltrs) {
        var len = ltrs.length;
        for (var i = 0; i < len; i++) {
            var newPos = (ltrs[i].toLowerCase().charCodeAt(0) - 96 + i) % (len);
            if (newPos >= i) {
                ltrs.splice(newPos + 1, 0, ltrs[i]);
                ltrs.splice(i, 1);
            } else {
                var ch = ltrs[i];
                ltrs.splice(i, 1);
                ltrs.splice(newPos, 0, ch);
            }
        }
        return ltrs;
    }

}//end of solve function

solve(['Fun exam right']);
solve(['Hi exam']);