function printArgNameAndType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log("Argument name: " + arguments[i] + ", Type: " + typeof arguments[i]);
    }
}

printArgNameAndType(5.2, "test", this);
printArgNameAndType(new Date(), this);

function wrapper() {
    printArgNameAndType(5.2, "called from wrapper", this);
    console.log("this in wrapper: ", this);
}
wrapper();

printArgNameAndType.call(this, 6);
printArgNameAndType.apply(this, [4, 5, 6, 7.3]);

