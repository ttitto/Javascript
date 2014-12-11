define([ 'Controller', 'notify'],
    function (Controller, notify) {
        var note = $('#notes').notify(),
            UserController = (function () {

                function UserController(dataRepo) {
                    Controller.call(this, dataRepo);
                }

                UserController.prototype = Object.create(Controller.prototype);
                UserController.prototype.constructor = this;

                UserController.prototype.loadRegister = function loadRegister(selector) {
                    $(selector).load('./templates/registerForm.html');
                };

                UserController.prototype.attachEventHandlers = function () {
                    Controller.prototype.attachEventHandlers.call(this);
                    attachRegisterHandler.call(this, '#user-forms');
                };

                var attachRegisterHandler = function (selector) {
                    var _this = this;
                    $(selector).on('click', '#reg-btn', function () {
                        var username = $('#reg-username-input').val(),
                            password = $('#reg-password-input').val(),
                            repeat = $('#reg-repeat-input').val();

                        try {
                            username.isNullEmptyUndefined('Username can not be undefined, empty or null!');
                        } catch (err) {
                            note.errorMessage('', 'You should fill a username!');
                        }

                        try {
                            password.isNullEmptyUndefined('Password can not be undefined, empty or null!');
                        } catch (err) {
                            note.errorMessage('', 'You should fill a password!');
                        }

                        if (password != repeat) {
                            note.errorMessage('', 'Password doesn\'t match');
                        }

                        _this.getDataRepo().users.register(username, password)
                            .then(
                            function registerSuccess(registerData) {
                                note.successMessage('Registration successful!');
                            },
                            function registerError(err) {
                                note.errorMessage('', 'A problem occured while trying to register.');
                                console.log(err.responseText);
                            }
                        );

                    });
                };

                return UserController;
            }());

        return UserController;
    });
