function createArray(value) {
    for (var i = 0; i < value.length; i++) {
        value[i] = i * 5;
    }

    return value.join(', ');
}
console.log(createArray(new Array(20)));