function validateNumericField(field) {
    var integerRgx = /^[0-9]*$/;

    if (!integerRgx.test(field.value)) {
        field.className = 'invalid';
        return false;
    } else {
        field.className = '';
        return true;
    }
}
