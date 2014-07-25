function group(persons) {
    var criterium = arguments[1] || 'firstname';
    var hist = [];
    var resultStr = '';

    for (var p in persons) {
        var prop = persons[p][criterium];
        if (hist.indexOf(prop) < 0) {
            resultStr += '\nGroup ' + prop + ': ' + persons[p].firstname + ' ' + persons[p].lastname + ' (' + persons[p].age + ')';
            hist.push(prop);
            for (var i = parseInt(p) + 1; i < persons.length; i++) {
                if (prop === persons[i][criterium]) {
                    resultStr += ', ' + persons[i].firstname + ' ' + persons[i].lastname + ' (' + persons[i].age + ')';
                }
            }
        }
    }
    console.log(resultStr);
}

function Person(firstname, lastname, age) {

    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
}

var persons = [];
persons.push(new Person("Scott", "Guthrie", 38));
persons.push(new Person("Scott", "Johns", 36));
persons.push(new Person("Scott", "Hanselman", 39));
persons.push(new Person("Jesse", "Liberty", 57));
persons.push(new Person("Jon", "Skeet", 38));


group(persons, 'firstname');
group(persons, 'age');
group(persons, 'lastname');
