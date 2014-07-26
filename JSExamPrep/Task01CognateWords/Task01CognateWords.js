function solve(args) {

    var result = [];
    var words = args[0].split(/[^a-zA-Z]+/);
    words = words.filter(function (el) {
        return el != '';
    });
    var wordLen = words.length;
    for (var i = 0; i < wordLen; i++) {
        for (var k = 0; k < wordLen; k++) {
            for (var j = 0; j < wordLen; j++) {
                if (i !== k) {
                    if (words[i] + words[k] === words[j]) {
                        var word = words[i] + '|' + words[k] + '=' + words[j];
                        if (result.indexOf(word) < 0) {
                            result.push(word);
                        }
                    }
                }
            }
        }
    }
    if (result.length < 1) {
        return 'No';
    } else {

        return result.join('\n');
    }

}//end solve function

solve(['Uni(lo,.ve=I love SoftUni (Soft)']);


