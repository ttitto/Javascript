var videoSystem = angular.module('videoSystem', ['ngRoute'])
        .config(function ($routeProvider, $httpProvider) {
            var parseComHeaders = {
                'X-Parse-REST-API-Key': 'ANF4e3hajhdKdgbLSZDJ8Sp6d1hqdPPTPKphzcMf',
                'X-Parse-Application-Id': 'dw2HskIjtjpbRGaI1RouVsPztmN3AiH7Nhib27gu'
            };
//            $.extend($httpProvider.defaults.headers.post, parseComHeaders);
            $.extend($httpProvider.defaults.headers.common, parseComHeaders);

            $routeProvider
                .when('/', {
                })
                .when('/login', {
                    templateUrl: './templates/login-form.html'
                })
                .when('/register', {
                    templateUrl: './templates/register-form.html'
                })
                .when('/add-video', {
                    templateUrl: './templates/add-video.html'
                })
                .otherwise({
                    redirectTo: '/'
                })
        })
    ;