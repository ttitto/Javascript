function findMostFreqWord(value) {
    value = value.toLowerCase();
    var occurencies = {};
    var words = value.split(/\W/g);
    var counter = 0;
    var resultStr = '';

    for (var w in words) {
        if (words[w].length < 1) {
            continue;
        }

        if (typeof(occurencies[words[w]]) == 'undefined') {
            occurencies[words[w]] = 1;
        } else {
            occurencies[words[w]]++;
            if (counter < occurencies[words[w]]) {
                counter = occurencies[words[w]];
            }
        }
    }
    var sorted = Object.filter(occurencies, counter).sort();
    for (var mostFrequent in sorted) {
        resultStr += sorted[mostFrequent ] + ' -> ' + counter + ' times\n';
    }
    return resultStr;
}

Object.filter = function (obj, target) {
    var result = [];
    for (var key in obj) {
        if (obj[key] == target) {
            result.push(key);
        }
    }
    return result;
};

console.log(findMostFreqWord('in the middle of the night'));
console.log(findMostFreqWord('Welcome to SoftUni. Welcome to Java. Welcome everyone.'));
console.log(findMostFreqWord('Hello my friend, hello my darling. Come on, come here. Welcome, welcome darling.'));