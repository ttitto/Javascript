function sumTwoHugeNumbers(value) {
    var bgInt = require('./biginteger.js');
    var num1 = bgInt.BigInteger(value[0]);
    var num2 = bgInt.BigInteger(value[1]);

    return num1.add(num2)['_d'].reverse().join('');
}

console.log(sumTwoHugeNumbers(['155', '65']));
console.log(sumTwoHugeNumbers(['123456789', '123456789']));
console.log(sumTwoHugeNumbers(['887987345974539', '4582796427862587']));
console.log(sumTwoHugeNumbers(['347135713985789531798031509832579382573195807',
        '817651358763158761358796358971685973163314321']
));