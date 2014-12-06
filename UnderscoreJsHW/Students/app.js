(function () {
    var students = JSON.parse('[{"gender":"Male","firstName":"Joe","lastName":"Riley","age":22,"country":"Russia"},' +
        '{"gender":"Female","firstName":"Lois","lastName":"Morgan","age":41,"country":"Bulgaria"},' +
        '{"gender":"Male","firstName":"Roy","lastName":"Wood","age":33,"country":"Russia"},' +
        '{"gender":"Female","firstName":"Diana","lastName":"Freeman","age":40,"country":"Argentina"},' +
        '{"gender":"Female","firstName":"Bonnie","lastName":"Hunter","age":23,"country":"Bulgaria"},' +
        '{"gender":"Male","firstName":"Joe","lastName":"Young","age":16,"country":"Bulgaria"},' +
        '{"gender":"Female","firstName":"Kathryn","lastName":"Murray","age":22,"country":"Indonesia"},' +
        '{"gender":"Male","firstName":"Dennis","lastName":"Woods","age":37,"country":"Bulgaria"},' +
        '{"gender":"Male","firstName":"Billy","lastName":"Patterson","age":24,"country":"Bulgaria"},' +
        '{"gender":"Male","firstName":"Willie","lastName":"Gray","age":42,"country":"China"},' +
        '{"gender":"Male","firstName":"Justin","lastName":"Lawson","age":38,"country":"Bulgaria"},' +
        '{"gender":"Male","firstName":"Ryan","lastName":"Foster","age":24,"country":"Indonesia"},' +
        '{"gender":"Male","firstName":"Eugene","lastName":"Morris","age":37,"country":"Bulgaria"},' +
        '{"gender":"Male","firstName":"Eugene","lastName":"Rivera","age":45,"country":"Philippines"},' +
        '{"gender":"Female","firstName":"Kathleen","lastName":"Hunter","age":28,"country":"Bulgaria"}]'
    );
    console.log('Students collection');
    console.dir(students);

    // task 1
    console.log('•	Get all students with age between 18 and 24');
    var middleAgedStudents = _.filter(students, function (stud) {
        return (stud.age >= 18 && stud.age <= 24);
    });
    console.dir(middleAgedStudents);

    // task 2
    console.log('•	Get all students whose first name is alphabetically before their last name');
    var withSmallerFirstNamesThanLast = _.filter(students, function (stud) {
        return stud.firstName < stud.lastName;
    });
    console.dir(withSmallerFirstNamesThanLast);

    // task 3
    console.log('•	Get only the names of all students from Bulgaria ');
    var bulgarianStudents = _.filter(students, function (stud) {
        return stud.country == 'Bulgaria';
    });
    console.dir(bulgarianStudents);

    // task 4
    console.log('•	Get the last five students');
    var lastFiveStudents = _.last(students, 5);
    console.dir(lastFiveStudents);

    // task 5
    console.log('•	Get the first three students who are not from Bulgaria and are male');
    var first3NotBulgarianMales = _.chain(students)
        .filter(function (stud) {
            return (stud.country != 'Bulgaria' && stud.gender == 'Male');
        })
        .last(3)
        .value();
    console.dir(first3NotBulgarianMales);
}());