(function () {
    'use strict';

    require(['./Container', './TodoDomElement', './Section', "./Item"],
        function (Container, TodoDomElement, Section, Item) {

            var container = new Container('Saturday TODO List');
            container.addToDOM(document.body);

            container.getContext().querySelector('.add-section-btn').addEventListener('click', function(){
                var title = container.getContext().querySelector('.section-title'),
                    section = new Section(title.value);
                section.addToDOM(container.getContext().querySelector('.sections'));

                section.getContext().querySelector('.add-item-btn').addEventListener('click', function(){
                    var itemContent = section.getContext().querySelector('.item-content'),
                        item = new Item(itemContent.value);
                    item.addToDOM(section.getContext().querySelector('.items'));
                });
            });


        }
    );
}());