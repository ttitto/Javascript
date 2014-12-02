var BooksController = (function () {
    function BooksController(dataPersister, headers) {
        this.persister = dataPersister;
        this.setHeaders(headers);
    }

    BooksController.prototype.getHeaders = function () {
        return this._headers;
    };

    BooksController.prototype.setHeaders = function (headers) {
        this._headers = headers;
    };

    BooksController.prototype.getAll = function () {
        var _this = this;

        this.persister.books.getAll(
            function (data) {
                console.dir(data);
            },
            function (err) {
                console.log(err);
            },
            _this.getHeaders()
        );
    };

    return BooksController;
}());