Array.prototype.removeItem = function (value) {
    var len = this.length;
    var resultArr = [];
    for (var i = 0; i < len; i++) {
        if (this[i] !== value) {
            resultArr.push(this[i]);
        }
    }
    return resultArr;
};

var arr = [1, 2, 1, 4, 1, 3, 4, 1, 111, 3, 2, 1, '1'];
console.log(arr.removeItem(1));
arr = ['hi', 'bye', 'hello' ];
console.log(arr.removeItem('bye'));
