var videoSystem = angular.module('videoSystem', ['ngRoute'])
        .config(function ($routeProvider, $httpProvider) {
            var parseComHeaders = {
                'X-Parse-REST-API-Key': 'ANF4e3hajhdKdgbLSZDJ8Sp6d1hqdPPTPKphzcMf',
                'X-Parse-Application-Id': 'dw2HskIjtjpbRGaI1RouVsPztmN3AiH7Nhib27gu'
            };
//            $.extend($httpProvider.defaults.headers.post, parseComHeaders);
            $.extend($httpProvider.defaults.headers.common, parseComHeaders);

            $routeProvider
                .when('/login', {
                    action: 'angular',
                    templateUrl: './templates/login-form.html'
                })
                .when('/register', {
                    action: 'angular',
                    templateUrl: './templates/register-form.html'
                })
                .when('/', {
                    controller: 'MenuController',
                    templateUrl: './templates/user-menu-links.html',
                    resolve: {
                        menuLinks: function (userData) {
                            if (userData.isLoggedUser) {
                                return './templates/user-menu-links.html';
                            } else {
                                return './templates/menu-links.html';
                            }
                        }
                    }
                },{
                    controller: 'UserController',
                    templateUrl: './templates/menu-links.html'
                })
                .otherwise({
                    redirectTo: '/'
                })
        })
    ;