function displayProperties(value) {
    var props=new Array();
    for (var prop in value) {
        props.push(prop);
    }

    return props.join('\n');
}
displayProperties(DOMImplementation.implementation.createDocument('','',null));