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
            ajaxRequester.get(
                this.baseUrl,
                success,
                error,
                headers
            );
        };

        return Books;
    });

    return{
        get: function (baseUrl) {
            return new Persister(baseUrl);
        }
    }
}());