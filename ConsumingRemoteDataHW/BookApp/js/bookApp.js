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
            onEditBookButtonClick();
            onDeleteBookButtonClick();
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

    function attachBookFormToDom(bookId, parentEl, legend, bookTitle, bookAuthor, bookIsbn, bookTags, btnText) {
        parentEl.html('');
        $('<fieldset data-id="' + bookId + '"><legend>' + legend + '</legend></fieldset>')
            .append($('<label>Title<input type="text" id="title-input" value="' + bookTitle + '"></label>'))
            .append($('<label>Author<input type="text" id="author-input" value="' + bookAuthor + '"></label>'))
            .append($('<label>ISBN<input type="text" id="isbn-input" value="' + bookIsbn + '"></label>'))
            .append($('<label>Tags<input type="text" id="tags-input" value="' + bookTags + '"></label>'))
            .append($('<input type="button" id="book-add-btn" value="' + btnText + '">'))
            .appendTo(parentEl);

        onSubmitAdditionButtonClick();
    }

    function onAddBookButtonClick() {
        var parentEl = $('#book-form');
        $('.book-add-btn').on('click', function () {
            attachBookFormToDom(null, parentEl, 'Add new book', '', '', '', '', 'Add');
        });
    }

    function onEditBookButtonClick() {
        var parentEl = $('#book-form');
        $('.book-edit-btn').on('click', function () {
            booksController.getById($(this).attr('data-id'))
                .then(function (data) {
                    attachBookFormToDom(null, parentEl, 'Edit current book', '', '', '', '', 'Edit');
                    $('#title-input').val(data.title);
                    $('#author-input').val(data.author);
                    $('#isbn-input').val(data.isbn);
                    $('#tags-input').val(data.tags);
                })
                .done();
        });
    }

    function onDeleteBookButtonClick() {
        $('.book-del-btn').on('click', function () {
            var bookId = $(this).attr('data-id');
            booksController.deleteById(bookId)
                .then(function (data) {
                    $('[data-id="' + bookId + '"].book').remove();
                });

        });
    }

    function onSubmitAdditionButtonClick() {
        $('#book-add-btn').on('click', function () {
            var bookData = {
//                objectId: data,
                title: $('#title-input').val(),
                author: $('#author-input').val(),
                isbn: $('#isbn-input').val(),
                tags: $('#tags-input').val()
            };
            booksController.add(bookData)
                .then(function (data, bookData) {
                    console.dir(data);
                    //$.extend(bookData, data);
                     attachBookToDom(bookData, $('#books-area'));
                })
                .done();
        });
    }

    function onSubmitEditionButtonClick() {
        // TODO: implement submit of edited book
    }

}());