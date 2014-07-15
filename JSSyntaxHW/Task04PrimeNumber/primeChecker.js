function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i == 0) {
            return false;
        }
    }
    return true;
}

console.log(isPrime(7));
console.log(isPrime(254));
console.log(isPrime(587));