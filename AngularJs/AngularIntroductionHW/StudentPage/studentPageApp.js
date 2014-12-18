"use strict";
var studentPage = angular.module('studentPage', []);
studentPage.controller('StudentController', function ($scope) {
    $scope.student = {
        name: "Pesho",
        photo: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQDr9PMrN8fww-wq5Wr2pkKOyaFaj8fx9PdnAlNGZ2fuP0-aQf2",
        grade: 5,
        school: "High School of Mathematics",
        teacher: "Gichka Pesheva",
    };

});