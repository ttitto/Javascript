define(['AjaxRequester'],
    function (AjaxRequester) {
        var DataRepo = (function () {
            function DataRepo(baseUrl) {
                this.baseUrl = baseUrl;
                this.requester = new AjaxRequester();
            }

            return DataRepo;
        }());

        return DataRepo;
    });