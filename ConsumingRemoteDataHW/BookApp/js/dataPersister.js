var dataPersister = (function () {
    function Persister(baseUrl) {
        this.baseURl = baseUrl;
        this.books = new Books(baseUrl);
    }

    var Books = (function () {
        function Books(baseUrl) {
            this.baseUrl = baseUrl + 'Book/';
        }

        Books.prototype.getAll = function (success, error, headers) {
            return  ajaxRequester.get(this.baseUrl, success, error, headers);
        };

        Books.prototype.getById = function (bookId, success, error, headers) {
            var concreteBookUrl = this.baseUrl + bookId;
            return ajaxRequester.get(concreteBookUrl, success, error, headers);
        };

        Books.prototype.deleteById = function (bookId, success, error, headers) {
            var concreteBookUrl = this.baseUrl + bookId;
            return ajaxRequester.delete(concreteBookUrl, success, error, headers);
        };

        Books.prototype.add = function (bookData, success, error, headers) {
            return ajaxRequester.post(this.baseUrl, success, error, headers, false, false, bookData);
        };

        return Books;
    }());

    return{
        get: function (baseUrl) {
            return new Persister(baseUrl);
        }
    }
}());