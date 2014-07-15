function roundNumber(value) {
    var rnd=Math.round(value);
    var flo=Math.floor(value);
    return flo +"\n"+ rnd;
}
console.log(roundNumber(22.7));
console.log(roundNumber(12.3));
console.log(roundNumber(58.7));