function traverse(selector) {
    var searchedNodes = document.querySelectorAll(selector);

    if (!searchedNodes) {
        return null;
    }

    for (var n = 0; n < searchedNodes.length; n++) {
        traverseDOM(searchedNodes[n], "-");
    }

    function traverseDOM(node, indentor) {
        indentor = indentor || "  ";

        var idStr = node.id ? " id=\"" + node.id + "\"" : '';

        var classStr = "";
        var list = node.classList;

        if (list.length > 0) {
            classStr = ", class=\"";

            for (var j = 0; j < list.length; j++) {
                classStr += list[j] + " ";
            }

            classStr += "\"";
        }

        console.log(indentor + node.nodeName + ":" + idStr + classStr);

        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];

            if (child.nodeType === 1) {
                traverseDOM(child, indentor + indentor);
            }
        }
    }
}

traverse(".birds");

//function bodyTraverse(selector) {
//    var name;
//    if (selector.indexOf(".") == 0) {
//        name = selector.substring(1);
//        var elements = document.getElementsByClassName(name);
//        console.log(elements);
//    } else if (selector.indexOf("#") == 0) {
//        name = selector.substring(1);
//        var element = document.getElementById(name);
//        console.log(element);
//    }
//}