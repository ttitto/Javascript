function clone(value) {
    return JSON.parse(JSON.stringify(value));
}
function compareObjects(obj, objCopy) {
    return console.log('a==b -> ' + (obj == objCopy));
}


var a = {name: 'Pesho', age: 21};
var b = clone(a); // a deep copy
compareObjects(a, b);

a = {name: 'Pesho', age: 21};
b = a; // not a deep copy
compareObjects(a, b);
