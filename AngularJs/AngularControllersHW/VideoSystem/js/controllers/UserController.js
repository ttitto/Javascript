videoSystem.controller('UserController', function ($scope, $window, userData) {
    $scope.register = registerUser;
    $scope.login = loginUser;
    $scope.userData = userData;
    $scope.logout = logout;

    function registerUser() {
        var user = {
            username: $scope.username,
            password: $scope.password
        };
        userData.register(user)
            .then(
            function () {
                alert('user successfully registered');
                $window.location.href = '#/login';
            },
            function (err) {
                console.log(err);
                $window.location.href = '#/login';
            }
        );
    }

    function loginUser() {
        var user = {
            username: $scope.username,
            password: $scope.password
        };

        userData.login(user)
            .then(
            function (userLoginData) {
                console.dir(userLoginData);
                userData.setLoggedUser(userLoginData);
                $window.location.href = '#/';
            },
            function (err) {
                console.log(err);
            }
        )
    }

    function logout() {
        userData.logout();
    }
});