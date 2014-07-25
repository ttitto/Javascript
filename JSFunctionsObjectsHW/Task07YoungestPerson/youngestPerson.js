function findYoungestPerson(persons) {
    var youngest = {};
    for (p in persons) {
        //return typeof (youngest['age']);
        if (typeof (youngest['age']) == 'undefined') {
            youngest = persons[p];
        }
        if (persons[p]['age'] < youngest['age']) {
            youngest = persons[p];
        }
    }
    return 'The youngest person is ' + youngest['firstname'] + ' ' + youngest['lastname'];
}
var persons = [
    { firstname: 'George', lastname: 'Kolev', age: 32},
    { firstname: 'Bay', lastname: 'Ivan', age: 81},
    { firstname: 'Baba', lastname: 'Ginka', age: 40}
];
console.log(findYoungestPerson(persons));
