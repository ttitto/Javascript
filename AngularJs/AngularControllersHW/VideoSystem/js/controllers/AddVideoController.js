videoSystem.controller('AddVideoController', function AddVideoController($scope, parseCom, userData) {
    $scope.addVideo = function addVideo(video, addVideoForm) {
        if (addVideoForm.$valid) {
            var userId = userData.getLoggedUser().userId;
            parseCom.addVideo(video, userId)
                .then(function success(success) {
                    console.log('video ' + success + 'added');
                },
                function error(err) {
                    console.log(err);
                })
        }
    }
});
