var ajaxRequester = (function () {
    var makeRequest = function makeRequest(url, requestType, success, error, headers, data, contentType, dataType) {
        return $.ajax({
            url: url,
            type: requestType,
            success: success,
            error: error,
            headers: headers,
            data: JSON.stringify(data),
            contentType: contentType,
            dataType: dataType
        });
    };

    function makeGetRequest(url, success, error, headers, contentType, dataType) {
        dataType = dataType || 'json';

        return makeRequest(url, 'GET', success, error, headers, null, contentType, dataType);
    }

    function makePostRequest(url, success, error, headers, contentType, dataType, data) {
        contentType = contentType || 'application/json; charset=UTF-8';
        dataType = dataType || 'json';

        return makeRequest(url, 'POST', success, error, headers, data, contentType, dataType);
    }

    function makePutRequest(url, success, error, headers, data, contentType, dataType) {
        contentType = contentType || 'application/json; charset=UTF-8';
        dataType = dataType || 'json';

        return makeRequest(url, 'PUT', success, error, headers, data, contentType, dataType);
    }

    function makeDeleteRequest(url, success, error, headers, contentType, dataType) {
        contentType = contentType || 'application/json; charset=UTF-8';
        dataType = dataType || 'json';

        return makeRequest(url, 'DELETE', success, error, headers, null, contentType, dataType);
    }

    return {
        get: makeGetRequest,
        post: makePostRequest,
        put: makePutRequest,
        delete: makeDeleteRequest
    }
}());