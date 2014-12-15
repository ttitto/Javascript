function solve(args) {
    var i = 0;
    var inputArr = [];
    while (typeof (args[i]) !== 'undefined') {
        inputArr.push(args[i].split(' | '));
        i++;
    }
    var cities = {

    };
    for (var k = 0; k < inputArr.length; k++) {
        var row = inputArr[k];
        var city = row[1];
        var stad = row[3];
        var group = row[0];

        if (!(city in cities)) {
            cities[city] = {};
        }
        if (!(stad in cities[city])) {
            cities[city][stad] = [];
        }
        if (cities[city][stad].indexOf(group) < 0) {
            cities[city][stad].push(group);
        }
//        if (!(group in timetable[city][stad] )) {
//            timetable[city][stad].push(group);
//        } else {
////            if (timetable[city][stad].indexOf(group) < 0) {
////                timetable[city][stad].push(group);
////            }
//        }

    }
    /**/
    var sort = function (obj) {
        var array = [];
        for (var i in obj) {
            array.push([obj[i], i]);
        }
        array.sort();
        var newObj = {};
        for (var i = 0; i < array.length; i++) {
            newObj[array[i][1]] = array[i][0];
        }
        return newObj;
    }
    /**/

    var sortedTimetable = sort(cities);
    for (city in sortedTimetable) {
        sortedTimetable[city] = sort(cities[city]);

        for (stad in sortedTimetable[city]) {
            sortedTimetable[city][stad]=  sortedTimetable[city][stad].sort(sortedTimetable[city][stad]);
        }

    }


    console.log(JSON.stringify(sortedTimetable));
}//end solve function

solve([
    "ZZ Top | London | 2-Aug-2014 | Wembley Stadium",
    "Iron Maiden | London | 28-Jul-2014 | Wembley Stadium",
    "Metallica | Sofia | 11-Aug-2014 | Lokomotiv Stadium",
    "Helloween | Sofia | 1-Nov-2014 | Vassil Levski Stadium",
    "Iron Maiden | Sofia | 20-June-2015 | Vassil Levski Stadium",
    "Helloween | Sofia | 30-July-2015 | Vassil Levski Stadium",
    "Iron Maiden | Sofia | 26-Sep-2014 | Lokomotiv Stadium",
    "Helloween | London | 28-Jul-2014 | Wembley Stadium",
    "Twisted Sister | London | 30-Sep-2014 | Wembley Stadium",
    "Metallica | London | 03-Oct-2014 | Olympic Stadium",
    "Iron Maiden | Sofia | 11-Apr-2016 | Lokomotiv Stadium",
    "Iron Maiden | Buenos Aires | 03-Mar-2014 | River Plate Stadium"

]);


