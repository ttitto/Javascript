(function () {
    var persister = dataPersister.get('https://api.parse.com/1/classes/'),
        headers = {
            'X-Parse-Application-Id': '8M8g7JBQNDJkMfSURvanJa4S64StDTww49JSxIXp',
            'X-Parse-REST-API-Key': 'TQc46UlejgS6QFxXYXWc0UTNfC6ZrwKLQzm04tQ1'
        },
        booksController = new BooksController(persister, headers);

    booksController.getAll()
        .then(function (data) {
            var parentEl = $('#books-area'),
                d = $.Deferred();

            $.each(data.results, function (index, book) {
                attachBookToDom(book, parentEl);
            });

            // attach add button
            parentEl.append($('<input type="button" value="Add Book">').addClass('book-add-btn'));

            d.resolve(data);
            return d.promise();
        })
        .then(function (data) {
            console.log('second promise');
            onAddBookButtonClick();
        })
        .done();

    function attachBookToDom(book, parentEl) {
        $('<div data-id="' + book.objectId + '"></div>').addClass('book')
            .append($('<input type="button" data-id="' + book.objectId + '" value="Edit" title="Edit this book" >')
                .addClass('book-edit-btn'))
            .append($('<input type="button" data-id="' + book.objectId + '" value="X" title="Delete this book">')
                .addClass('book-del-btn'))
            .append($('<p><span class="label" >Title: </span>' + book.title + '</p>').addClass('book-title'))
            .append($('<p><span class="label" >Author: </span>' + book.author + '</p>').addClass('book-author'))
            .append($('<p<span class="label" >ISBN: </span>' + book.isbn + '</p>').addClass('book-isbn'))
            .append($('<p><small>' + book.tags + '</small></p>').addClass('book-tags'))
            .appendTo(parentEl);
    }

    function attachBookFormToDom(bookId, parentEl, legend, bookName, bookAuthor, bookIsbn, bookTags, btnText) {
        parentEl.html('');
        $('<fieldset data-id="' + bookId + '"><legend>' + legend + '</legend></fieldset>')
            .append($('<label>Name<input type="text" value="' + bookName + '"></label>'))
            .append($('<label>Author<input type="text" value="' + bookAuthor + '"></label>'))
            .append($('<label>ISBN<input type="text" value="' + bookIsbn + '"></label>'))
            .append($('<label>Tags<input type="text" value="' + bookTags + '"></label>'))
            .append($('<input type="button" value="' + btnText + '">'))
            .appendTo(parentEl);
    }

    function onAddBookButtonClick() {
        var parentEl = $('#book-form');
        $('.book-add-btn').on('click', function () {
            attachBookFormToDom(null, parentEl, 'Add new book', '', '', '', '', 'Add');
        });
    }

    function onEditBookButtonClick() {
// TODO: implement attaching of the form after edit click button
    }

    function onDeleteBookButtonClick() {
// TODO: implement deleting a book and updating books area after delete button click
    }

}());