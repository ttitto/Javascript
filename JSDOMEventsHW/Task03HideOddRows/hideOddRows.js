function hideOddRows() {
    //appends display=none; style to odd tr elements
    var odds = document.getElementsByTagName("tr");
    odds = Array.prototype.slice.call(odds);
    odds = odds.filter(getShownOnly);
    for (var row in odds) {
        if (row % 2 == 0) {
            odds[row].style.display = 'none';
        }
    }
}
//filtering function
function getShownOnly(a) {
    return a.style.display != 'none';
}
document.getElementById('btnHideOddRows').onclick = hideOddRows;