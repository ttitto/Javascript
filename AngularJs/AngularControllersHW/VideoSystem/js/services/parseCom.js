"use strict";

videoSystem.factory('parseCom', function ($q, $http) {
    var headers = {
            'X-Parse-REST-API-Key': 'dw2HskIjtjpbRGaI1RouVsPztmN3AiH7Nhib27gu',
            'X-Parse-Application-Id': 'ANF4e3hajhdKdgbLSZDJ8Sp6d1hqdPPTPKphzcMf'
        },
        baseUrl = 'https://api.parse.com/1/',
        videoUrl = baseUrl + 'classes/Video',
        getUserReadWriteACL = function (userId) {
            return '{"ACL":{ "*":{"read":true}, "' + userId + '":{"write":true,"read":true}}}';
        },
        addVideo = function addVideo(video, userId) {
            angular.extend(video, JSON.parse(getUserReadWriteACL(userId)));
            var d = $q.defer();
            $http.post(videoUrl, video)
                .success(function (videoData) {
                    d.resolve(videoData);
                })
                .error(function (err) {
                    d.reject(err);
                });

            return d.promise;
        };

    return{
        headers: headers,
        baseUrl: baseUrl,
        addVideo: addVideo
    }
});
