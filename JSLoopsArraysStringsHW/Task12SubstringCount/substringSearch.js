function countSubstringOccur(value) {
    var counter = 0;
    var str = value[0].toLowerCase();
    var text = value[1].toLowerCase();

    do {
        var currentInd = text.search(str);
        if (currentInd >= 0) {
            counter++;
        }
        text = text.slice(currentInd + 1);
    } while (currentInd >= 0);
    return counter;
}
console.log(countSubstringOccur(['in', 'We are living in a yellow submarine. We don\'t have anything else. Inside the submarine is very tight. So we are drinking all the day. We will move out of it in 5 days.']));
console.log(countSubstringOccur(['your', 'No one heard a single word you said. They should have seen it in your eyes. What was going around your head.']));
console.log(countSubstringOccur(['but', 'But you were living in another world tryin\' to get your message through.']));