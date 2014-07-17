function printNumbers(n) {
    var arr=new Array();
    for(var i=2;i<=n;i++){
        if (i%4!=0 && i%5!=0) {
            arr.push(i);
        }
    }
    if (arr.length>=1) {
        return arr.join(', ');
    }else{
        return 'no';
    }
}
console.log(printNumbers(20));
console.log(printNumbers(1));
console.log(printNumbers(13));