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

            onAddBookButtonClick();
            onEditBookButtonClick();
            onDeleteBookButtonClick();

            d.resolve(data);
            return d.promise();
        });

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
            .prependTo(parentEl);
    }

    function updateBookToDom(book, parentEl) {
        parentEl.find('.book[data-id="' + book.objectId + '"]').remove();
        attachBookToDom(book, parentEl);
    }

    function attachBookFormToDom(bookId, parentEl, legend, bookTitle, bookAuthor, bookIsbn, bookTags, btnId, btnText) {
        parentEl.html('');
        $('<fieldset data-id="' + bookId + '"><legend>' + legend + '</legend></fieldset>')
            .append($('<label>Title<input type="text" id="title-input" value="' + bookTitle + '"></label>'))
            .append($('<label>Author<input type="text" id="author-input" value="' + bookAuthor + '"></label>'))
            .append($('<label>ISBN<input type="text" id="isbn-input" value="' + bookIsbn + '"></label>'))
            .append($('<label>Tags<input type="text" id="tags-input" value="' + bookTags + '"></label>'))
            .append($('<input type="button" id="' + btnId + '" value="' + btnText + '">'))
            .appendTo(parentEl);

        $('#book-add-btn').off('click');
        onSubmitAdditionButtonClick();
        onSubmitEditionButtonClick();
    }

    function onAddBookButtonClick() {
        var parentEl = $('#book-form');
        $('#books-area').on('click', '.book-add-btn', function (ev) {
            ev.stopPropagation();
            attachBookFormToDom(null, parentEl, 'Add new book', '', '', '', '', 'book-add-btn', 'Add');
        });
    }

    function onEditBookButtonClick() {
        var parentEl = $('#book-form');
        $('#books-area').on('click', '.book-edit-btn', function (ev) {
            ev.stopPropagation();
            var bookId = $(this).attr('data-id');
            booksController.getById(bookId)
                .then(function (data) {
                    attachBookFormToDom(bookId, parentEl, 'Edit current book', '', '', '', '', 'book-edit-btn', 'Edit');
                    $('#title-input').val(data.title);
                    $('#author-input').val(data.author);
                    $('#isbn-input').val(data.isbn);
                    $('#tags-input').val(data.tags);
                })
                .done();
        });
    }

    function onDeleteBookButtonClick() {
        $('#books-area').on('click', '.book-del-btn', function (ev) {
            ev.stopPropagation();
            var bookId = $(this).attr('data-id');
            booksController.deleteById(bookId)
                .then(function (data) {
                    $('[data-id="' + bookId + '"].book').remove();
                });

        });
    }

    function onSubmitAdditionButtonClick() {
        $('#book-add-btn').on('click', function (ev) {
            ev.stopPropagation();
            var bookData = {
//                objectId: data,
                    title: $('#title-input').val(),
                    author: $('#author-input').val(),
                    isbn: $('#isbn-input').val(),
                    tags: $('#tags-input').val()
                },
                book = $(this);

            booksController.add(bookData)
                .then(function (data, bookData) {
                    $.extend(bookData, data);
                    attachBookToDom(bookData, $('#books-area'));
                    book.parent().remove();
                })
                .done();
        });
    }

    function onSubmitEditionButtonClick() {
        $('#book-edit-btn').on('click', function (ev) {
            ev.stopPropagation();
            var book = $(this),
                bookData = {
                    objectId: book.parent().attr('data-id'),
                    title: $('#title-input').val(),
                    author: $('#author-input').val(),
                    isbn: $('#isbn-input').val(),
                    tags: $('#tags-input').val()
                };

            booksController.edit(book.parent().attr('data-id'), bookData)
                .then(function (bookData) {
                    bookData.objectId = book.parent().attr('data-id');
                    updateBookToDom(bookData, $('#books-area'));
                    book.parent().remove();
                })
                .done();
        });
    }
}());