define([ 'Controller', 'notify', 'Mustache'],
    function (Controller, notify, Mustache) {
        var note = $('#notes').notify(),
            self ,
            BookController = (function () {
                function BookController(dataRepo) {
                    self = this;
                    Controller.call(this, dataRepo);
                }

                BookController.prototype = Object.create(Controller.prototype);
                BookController.prototype.constructor = this;

                BookController.prototype.loadBookForm = function loadBookForm(selector) {
                    $.get('./templates/bookForm.html', function (template) {
                        $(selector).prepend(template);
                        attachAddNewBookHandler.call(this, '#book-form');
                    });
                };

                BookController.prototype.loadUserBooks = function loadUserBooks(selector) {
                    var userId = JSON.parse(sessionStorage.getItem('UserData')).userId;
                    this.getDataRepo().books.loadUserBooks(userId)
                        .then(
                        function loadUserBooksSuccess(userBooksData) {
                            $.get('./templates/books.html', function (template) {
                                var myBooksHtml = Mustache.render(template, userBooksData);
                                $(selector).html(myBooksHtml);
                                $(selector).prepend($('<h3>My books</h3>'));
                            });

                            note.successMessage('Your books were loaded successfully');
                        },
                        function loadUserBooksError(err) {
                            note.errorMessage('', 'We couldn\'t load your books!');
                            console.log(err.responseText);
                        }
                    );
                };

                BookController.prototype.attachEventHandlers = function attachEventHandlers() {
                    Controller.prototype.attachEventHandlers.call(this);
                    // attachAddNewBookHandler.call(this, '#book-form');
                };

                var attachAddNewBookHandler = function attachAddNewBookHandler(selector) {
                    var _this = this;
                    $(selector).on('click', '#add-book-formBtn', function (ev) {
                        var title = $('#title-input').val(),
                            author = $('#author-input').val(),
                            isbn = $('#isbn-input').val(),
                            tags = [],
                            user,
                            book;

                        $.each($('#tags-select').children(), function (index, opt) {
                            tags.push(opt.value);
                        });

                        console.dir(tags); //TODO: delete

                        user = JSON.parse(sessionStorage.getItem('UserData')).userId;

                        book = {
                            title: title,
                            author: author,
                            isbn: isbn,
                            userId: JSON.parse(self.getDataRepo().baas.getPointerString('_User', user)),
                            tags: tags,
                            "ACL": JSON.parse(self.getDataRepo().baas.getAcl(user))
                        };
                        self.getDataRepo().books.createBook(book)
                            .then(
                            function bookCreationSuccess(bookCreationData) {
                                note.successMessage('Book created successfully');
                                $(ev.target).parent().remove();
                                window.location = '#/';
                            },
                            function (err) {
                                note.errorMessage('Book couldn\'t be created');
                                console.log(err.responseText);
                            }
                        );
                    });
                };

                return BookController;
            }());

        return BookController;
    });
