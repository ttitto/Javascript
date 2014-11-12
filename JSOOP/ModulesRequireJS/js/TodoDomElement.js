define(function () {
    var TodoDomElement = (function () {
        function TodoDomElement(context) {
            if (this.constructor === TodoDomElement) {
                throw new Error("Can not instantiate abstract class TodoDomElement.");
            }

            this.setContext(context);
        }

        TodoDomElement.prototype.getContext = function () {
            return this._context;
        };

        TodoDomElement.prototype.setContext = function (context) {
            this._context = context;
        };

        TodoDomElement.prototype.addToDOM = function (parent) {
            if(!(parent instanceof HTMLElement)){
                throw  new TypeError('Parent should be of type HTMLElement.');
            }

            parent.appendChild(this._context);
        };

        return TodoDomElement;
    }());

    return TodoDomElement;
});