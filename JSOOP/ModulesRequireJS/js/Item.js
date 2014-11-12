define(["./TodoDomElement"], function (TodoDomElement) {
    var Item = (function () {
        function Item(content) {
            this.setContext(content);
        }

        Item.prototype = Object.create(TodoDomElement.prototype);
        Item.prototype.constructor = this;

        Item.prototype.setContext = function (content) {
            var divEl = document.createElement('div'),
                checkbox = document.createElement('input'),
                itemLabel = document.createElement('label');

            divEl.classList.add('item');

            checkbox.type = 'checkbox';
            checkbox.id = content;
            divEl.appendChild(checkbox);

            itemLabel.for = content;
            itemLabel.textContent = content;
            divEl.appendChild(itemLabel);

            this._context = divEl;
        };

        return Item;
    }());

    return Item;
});

