"use strict";

videoSystem.factory('userData', function ($http, $q, parseCom) {
    return{
        isLoggedUser: function isLoggedUser() {
            var sessionUser = sessionStorage.getItem('UserData');
            return !!sessionUser;
        },
        getLoggedUser: function getLoggedUser() {
            return JSON.parse(sessionStorage.getItem('UserData'));
        },
        setLoggedUser: function setLoggedUser(user) {
            var sessionUser = {
                userId: user.objectId,
                username: user.username,
                sessionToken: user.sessionToken
            };
            sessionStorage.setItem('UserData', JSON.stringify(sessionUser));
        },
        register: function (user) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: parseCom.baseUrl + 'users/',
                data: user
            })
                .success(function (userRegisterData) {
                    d.resolve(userRegisterData)
                })
                .error(function (err) {
                    d.reject(err);
                });

            return d.promise;
        },
        login: function login(user) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: parseCom.baseUrl + 'login/?username=' + user.username + '&password=' + user.password
            })
                .success(function (userLoginData) {
                    d.resolve(userLoginData);
                })
                .error(function (err) {
                    d.reject(err);
                });

            return d.promise;
        },
        logout: function logout() {
            sessionStorage.removeItem('UserData');
        }
    }
})
;
