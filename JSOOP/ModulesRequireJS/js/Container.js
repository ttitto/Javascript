define(['TodoDomElement'], function (TodoDomElement) {

    // var TodoList = TodoList || {};
    var Container = (function () {
        function Container(header) {
            this.setContext(header);
//            TodoDomElement.call(this, this.getContext());
        }

        Container.prototype = Object.create(TodoDomElement.prototype);
        Container.prototype.constructor = this;

        Container.prototype.getContext = function () {
            return this._context;
        };

        Container.prototype.setContext = function (header) {
            var headerEl = document.createElement('header'),
                h1El = document.createElement('h1'),
                divSectionsEl = document.createElement('div'),
                addSectionForm = document.createElement('form'),
                sectionTitleEl = document.createElement('input'),
                addSectionBtn = document.createElement('input'),
                main = document.querySelector('main.container');

            h1El.textContent = header;
            headerEl.appendChild(h1El);

            divSectionsEl.classList.add('sections');

            addSectionForm.classList.add('add-section-frm');

            sectionTitleEl.type = 'text';
            sectionTitleEl.classList.add('section-title');
            sectionTitleEl.placeholder = 'Title...';
            addSectionForm.appendChild(sectionTitleEl);

            addSectionBtn.type = 'button';
            addSectionBtn.classList.add('add-section-btn');
            addSectionBtn.value = 'New Section';
            addSectionForm.appendChild(addSectionBtn);

            if (!main) {
                main = document.createElement('main');
                main.classList.add('container');
            }

            main.appendChild(headerEl);
            main.appendChild(divSectionsEl);
            main.appendChild(addSectionForm);

            this._context = main;
        };

//        Container.prototype.addToDOM = function (parent) {
//            if(!(parent instanceof HTMLElement)){
//                throw  new TypeError('Parent should be of type HTMLElement.');
//            }
//
//          //parent.innerHTML = '';
//            parent.appendChild(this._context);
//        };

        return Container;
    }());

    return Container;
});