function fixCasing(value) {
    var rgx = new RegExp("(<.+?case>)(.*?)</.+?case>");
    var match;
    var replacer;
    while (match = rgx.exec(value)) {
        if (match[1] == '<upcase>') {
            replacer = match[2].toUpperCase();
            value = value.replace(match[0], replacer);
        } else if (match[1] == '<lowcase>') {
            replacer = match[2].toLowerCase();
            value = value.replace(match[0], replacer);
        } else if (match[1] == '<mixcase>') {
            replacer = randomizeCase(match[2]);
            value = value.replace(match[0], replacer);
        } else {
            return "Matched string's case is undefined!"
        }
    }
    return value;
}
//returns the current match with randomized case of its letters
function randomizeCase(string) {
    var resultStr = '';
    for (var i = 0; i < string.length; i++) {
        var rnd = Math.random();
        if (rnd < 0.5) {
            resultStr += string[i].toUpperCase();
        } else {
            resultStr += string[i].toLowerCase();
        }
    }
    return resultStr;
}
console.log(fixCasing('We are <mixcase>living</mixcase> in a <upcase>yellow submarine</upcase>. We <mixcase>don\'t</mixcase> have <lowcase>anything</lowcase> else.'));