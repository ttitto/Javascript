define([],
    function () {
        var AjaxRequester = (function () {
            function AjaxRequester() {
            }

            function makeRequest(url, requestType, headers, data, dataType, contentType) {
                var d = $.Deferred(),
                    dataType = dataType || 'json',
                    contentType = contentType || 'application/json; charset=UTF-8';

                $.ajax({
                    url: url,
                    type: requestType,
                    headers: headers,
                    data: JSON.stringify(data),
                    contentType: contentType,
                    dataType: dataType,
                    success: function makeRequestSuccess(data) {
                        $.resolve(data);
                    },
                    error: function makeRequestError(err) {
                        $.reject(err);
                    }
                });

                return d.promise();
            }

            AjaxRequester.prototype.get = function get(url, headers, dataType, contentType) {
                return makeRequest(url, 'GET', headers, null, dataType, contentType);
            };

            AjaxRequester.prototype.post = function post(url, headers, data, dataType, contentType) {
                return makeRequest(url, 'POST', headers, data, dataType, contentType);
            };

            AjaxRequester.prototype.put = function put(url, headers, data, dataType, contentType) {
                return makeRequest(url, 'PUT', headers, data, dataType, contentType);
            };

            AjaxRequester.prototype.del = function del(url, headers, dataType, contentType) {
                return makeRequest(url, 'DELETE', headers, null, dataType, contentType);
            };

            return AjaxRequester;
        }());

        return AjaxRequester;
    });