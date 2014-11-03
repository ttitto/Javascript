var domModule = (function () {

    function appendChild(element, selector) {
        var elements = retrieveElementsMethod(selector);
        for (var i = 0; i < elements.length; i++) {
            elements[i].appendChild(element);
        }
    }

    /**
     * Removes the first child element, matched by a CSS selector from all parent elements that match another CSS selector
     * @param parentSelector
     * @param childSelector
     */
    function removeChild(parentSelector, childSelector) {
        var elements = retrieveElementsMethod(parentSelector);
        var childToRemove = retrieveElementsMethod((childSelector));

        for (var i = 0; i < elements.length; i++) {
            elements[i].removeChild(childToRemove[0]);
        }
    }

    /**
     * Attaches an event of given type and a given event handler to an element matching a given selector
     * @param selector
     * @param eventType
     * @param handler
     */
    function addHandler(selector, eventType, handler) {
        var elements = retrieveElementsMethod(selector);

        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener(eventType, handler);
        }
    }

    /**
     * Finds and returns all DOM elements that match a given CSS selector
     * @param selector
     * @returns {Array}
     */
    function retrieveElementsMethod(selector) {
        var elements = [];
        var foundElements = document.querySelectorAll(selector);

        for (var i = 0; i < foundElements.length; i++) {
            elements.push(foundElements[i]);
        }

        return elements;
    }

    var newDomModule = {
        appendChild: appendChild,
        removeChild: removeChild,
        addHandler: addHandler,
        retrieveElements: retrieveElementsMethod
    }

    return newDomModule;
}());

var liElement = document.createElement("li");
liElement.className = "bird";
liElement.innerHTML = "dynamically inserted bird";
// Appends a list item to ul.birds-list
domModule.appendChild(liElement, ".birds-list");

// Removes the first li child from the bird list
domModule.removeChild("ul.birds-list", "li:first-child");

// Adds a click event to all bird list items
domModule.addHandler("li.bird", 'click', function () {
    alert("I'm a bird!")
});

//// Retrieves all elements of class "bird"
var elements = domModule.retrieveElements(".bird");
console.log(elements);