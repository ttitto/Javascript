define([ 'Controller', 'notify'],
    function (Controller, notify) {
        var note = $('#notes').notify(),
            UserController = (function () {

                function UserController(dataRepo) {
                    Controller.call(this, dataRepo);
                }

                UserController.prototype = Object.create(Controller.prototype);
                UserController.prototype.constructor = this;


                UserController.prototype.loadRegisterForm = function loadRegisterForm(selector) {
                    $(selector).load('templates/registerForm.html');
                };

                UserController.prototype.loadLoginForm = function loadLoginForm(selector) {
                    $(selector).load('templates/loginForm.html');
                };


                UserController.prototype.attachEventHandlers = function () {
                    Controller.prototype.attachEventHandlers.call(this);
                    attachRegisterHandler.call(this, '#main');
                    attachLoginHandler.call(this, '#main');
                    attachLogoutHandler.call(this, '#menu');
                };

                var attachRegisterHandler = function (selector) {
                    var _this = this;
                    $(selector).on('click', '#register-button', function (ev) {
                        var username = $('.register-form #username').val(),
                            password = $('.register-form #password').val(),
                            repeat = $('.register-form #confirm-password').val();

                        try {
                            username.isNullEmptyUndefined('Username can not be undefined, empty or null!');
                        } catch (err) {
                            note.errorMessage('', 'You should fill a username!');
                            console.log(err.responseText);
                        }

                        try {
                            password.isNullEmptyUndefined('Password can not be undefined, empty or null!');
                        } catch (err) {
                            note.errorMessage('', 'You should fill a password!');
                            console.log(err.responseText);
                        }

                        if (password != repeat) {
                            note.errorMessage('', 'Password doesn\'t match');
                        }

                        _this.getDataRepo().users.register(username, password)
                            .then(
                            function registerSuccess() {
                                note.successMessage('Registration successful. Please log in!');
                                window.location = '#/login';
                            },
                            function registerError(err) {
                                note.errorMessage('', 'A problem occurred while trying to register.');
                                console.log(err.responseText);
                            }
                        );
                    });
                };

                var attachLoginHandler = function (selector) {
                    var _this = this;
                    $(selector).on('click', '#login-button', function (ev) {
                        var username = $('.login-form #username').val(),
                            password = $('.login-form #password').val();

                        try {
                            username.isNullEmptyUndefined('Username can not be undefined, empty or null!');
                        } catch (err) {
                            note.errorMessage('', 'You should fill a username!');
                            console.log(err.responseText);
                        }

                        try {
                            password.isNullEmptyUndefined('Password can not be undefined, empty or null!');
                        } catch (err) {
                            note.errorMessage('', 'You should fill a password!');
                            console.log(err.responseText);
                        }

                        _this.getDataRepo().users.login(username, password)
                            .then(
                            function loginSuccess(loginData) {
                                note.successMessage('Login successful.');
                                sessionStorage.setItem('UserData',
                                    JSON.stringify({
                                        username: loginData.username,
                                        userId: loginData.objectId,
                                        sessionToken: loginData.sessionToken
                                    }));
                                window.location = '#/';
                            },
                            function loginError(loginErr) {
                                note.errorMessage('', 'A problem occurred while trying to login.');
                                console.log(loginErr.responseText);
                            }
                        );
                    });
                };

                var attachLogoutHandler = function (selector) {
                    $(selector).on('click', '.logout-link', function () {
                        sessionStorage.removeItem('UserData');
                        window.location = '#/logout';
//                        setTimeout(function () {
//
//                        }, 100);
                    });
                };

                return UserController;
            }());

        return UserController;
    });
