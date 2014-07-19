function findPalindromes(value) {
    value = value.toLowerCase();
    var palindromes = [];
    var words = value.split(/\W/gi);
    for (var w in words) {
        if (isPalindrome(words[w])) {
            palindromes.push(words[w]);
        }
    }
    return palindromes.join(', ');
}

function isPalindrome(word) {
    var len = word.length;
    if (len < 1) {
        return false;
    }
    if (len == 1) {
        return true;
    }
    for (var i = 0; i < len / 2; i++) {
        if (word[i] != word[len - i - 1]) {
            return false;
        }
    }
    return true;
}
console.log(findPalindromes('There is a man, his name was Bob.'));