var videoSystem = angular.module('videoSystem', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: './templates/login-form.html'
                })
                .when('/register', {
                    templateUrl: './templates/register-form.html'
                })
                .when('/home', function () {
                    if (sessionUser) {
                        return {templateUrl: './templates/user-menu-links.html'};
                    } else {
                        return {templateUrl: './templates/menu-links.html'};
                    }
                })
        })
    ;