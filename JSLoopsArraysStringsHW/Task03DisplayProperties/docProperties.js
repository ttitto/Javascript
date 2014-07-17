alert('loaded');
function displayProperties(value) {
    var props = [];
    for (var prop in value) {
        props.push(prop);
    }
    props.sort();
    return props.join('\n');
}
console.log(displayProperties(document));