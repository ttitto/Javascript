function findCardFrequency(value) {
    var cards = value.split(' ');
    var occurencies = {};
    var cardsCnt = cards.length;
    var cardsOrder = [];
    for (var i = 0; i < cardsCnt; i++) {
        var face = cards[i].substring(0, cards[i].length - 1);
        if (typeof( occurencies[face]) == 'undefined') {
            occurencies[face] = 1;
            cardsOrder.push(face);
        } else {
            occurencies[face]++;
        }
    }
    var resultStr = '';
    for (var f in cardsOrder) {
        resultStr += cardsOrder[f] + ' -> ' + (occurencies[cardsOrder[f]] / cardsCnt * 100).toFixed(2) + '%\n';
    }
    return resultStr;
}

console.log(findCardFrequency('8♥ 2♣ 4♦ 10♦ J♥ A♠ K♦ 10♥ K♠ K♦'));
console.log(findCardFrequency('J♥ 2♣ 2♦ 2♥ 2♦ 2♠ 2♦ J♥ 2♠'));
console.log(findCardFrequency('10♣ 10♥'));