//%s converts the argument to a String value
//%d converts the argument to a double value
//%i converts the argument to a integer value
//%f converts the argument to a floating point number
//%o converts the argument to an Object
var specialConsole = (function () {
    function writeLine(message) {
        console.log(getMessage.apply(this, arguments));
    }

    function writeError(message) {
        var msg = getMessage.apply(this, arguments);
        console.log("%c" + msg, "color:red;font-weight:bold;");
    }

    function writeWarning(message) {
        var msg = getMessage.apply(this, arguments);
        console.log("%c" + msg, "color:orange;font-weight:bold;");
    }

    function getMessage(message) {
        if (arguments.length > 1) {
            var pattern = /{\d*}/;
            var continuousPattern = /{\d*}/g;

            if (message.match(continuousPattern).length != arguments.length - 1) {
                throw new Error("The number of the placeholders and the actual values should be the same!");
            }

            for (var i = 1; i < arguments.length; i++) {
                message = message.replace(pattern, arguments[i]);
            }
        }

        return message;
    }

    var newConsole = {
        writeLine: writeLine,
        writeError: writeError,
        writeWarning: writeWarning
    }

    return newConsole;
}());

specialConsole.writeLine("Message: hello");
specialConsole.writeLine("Message: {0} {1}", "hello", "pich");
specialConsole.writeError("Error: {0}", "A fatal error has occurred.");
specialConsole.writeWarning("Warning: {0}", "You are not allowed to do that!");
