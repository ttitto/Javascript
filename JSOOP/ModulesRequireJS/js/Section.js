define(["./TodoDomElement"], function (TodoDomElement) {
    var Section = (function () {
        function Section(header) {
            this.setContext(header);
        }

        Section.prototype = Object.create(TodoDomElement.prototype);
        Section.prototype.constructor = this;


        Section.prototype.setContext = function (header) {
            var sectionEl = document.createElement('section'),
                divItemsEl = document.createElement('div'),
                sectionTitle = document.createElement('h2'),
                addItemForm = document.createElement('form'),
                addItemTitle = document.createElement('input'),
                addItemBtn = document.createElement('input');

            sectionEl.classList.add('todo-section');

            divItemsEl.classList.add('items');
            sectionTitle.classList.add('todo-section-title')
            sectionTitle.textContent = header;
            divItemsEl.appendChild(sectionTitle);

            addItemForm.classList.add('add-item-frm');
            addItemTitle.type = 'text';
            addItemTitle.classList.add('item-content');
            addItemTitle.placeholder = 'Add item...';
            addItemForm.appendChild(addItemTitle);

            addItemBtn.type = 'button';
            addItemBtn.classList.add('add-item-btn');
            addItemBtn.value = '+';
            addItemForm.appendChild(addItemBtn);

            sectionEl.appendChild(divItemsEl);
            sectionEl.appendChild(addItemForm);

            this._context = sectionEl;
        };

        return Section;
    }());

    return Section;
});
