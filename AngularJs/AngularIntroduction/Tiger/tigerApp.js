var tigerModule = angular.module('tigerApp', []);

tigerModule.controller('TigerController', function ($scope) {
    $scope.tiger = {
        'Name': 'Pesho',
        'Born': 'Asia',
        'BirthDate': 2006,
        'Live': 'Sofia Zoo'
    };

    $scope.url = 'http://tigerday.org/wp-content/uploads/2013/04/tiger.jpg';

    $scope.tigerStyle = {
        backgroundColor: '#CACACA',
        padding: '20px',
        width: '50%',
        overflow: 'hidden'
    };

    $scope.textWrapperStyle = {
        width: '50%',
        display: 'inline-block'
    };

    $scope.keyStyle = {
        fontFamily: 'Tahoma',
        fontWeight: 'bold',
        fontSize: '1.5em',
        color: '#2C3E50',
        textAlign: 'center',
        margin: '10px 20px',
        lineHeight:'1.7em'
    };

    $scope.propStyle = {
        fontFamily: 'Tahoma',
        color: '#2C3E50',
        fontSize: '1.5em'
    };

    $scope.imgStyle = {
        width: '300px',
        'float': 'right'
    };


});