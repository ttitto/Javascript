(function () {
    var books = JSON.parse('[{"book":"The Grapes of Wrath","author":"John Steinbeck","price":"34,24","language":"French"},    ' +
        ' {"book":"The Great Gatsby","author":"F. Scott Fitzgerald","price":"39,26","language":"English"},' +
        ' {"book":"Nineteen Eighty-Four","author":"George Orwell","price":"15,39","language":"English"},' +
        ' {"book":"Ulysses","author":"James Joyce","price":"23,26","language":"German"},' +
        ' {"book":"Lolita","author":"Vladimir Nabokov","price":"14,19","language":"German"},' +
        ' {"book":"Catch-22","author":"Joseph Heller","price":"47,89","language":"German"},' +
        ' {"book":"The Catcher in the Rye","author":"J. D. Salinger","price":"15,39","language":"English"},' +
        ' {"book":"Beloved","author":"Toni Morrison","price":"48,61","language":"French"},' +
        ' {"book":"Of Mice and Men","author":"John Steinbeck","price":"29,81","language":"Bulgarian"},' +
        ' {"book":"Animal Farm","author":"George Orwell","price":" 18,42","language":"English"},' +
        ' {"book":"Finnegans Wake","author":"James Joyce","price":"29,59","language":"English"},' +
        ' {"book":"The Grapes of Wrath","author":"John Steinbeck","price":"42,94","language":"English"}]'
    );
    console.dir(books);

    // task 1
    console.log('•	Group all books by language and sort them by author (if two books have the same author, sort by price)');
    var groupedAndSorted = _.chain(books)
        .sortBy(function (book) {
            return [book.author, book.price];
        })
        .groupBy(function (book) {
            return book.language;
        }).value();

    console.dir(groupedAndSorted);

    // task 2
    console.log('•	Get the average book price for each author');

    var averageByAuthor = _.chain(books)
        .groupBy(function (book) {
            return book.author;
        })
        .map(function (booksArr, key) {
            return{
                Author: key,
                'Average price': average(_.pluck(booksArr, 'price'))
            };
        })
        .value();

    function average(arr) {
        var cnt = parseFloat(arr.length),
            sum = 0.0;
        arr.forEach(function (a) {
            a = a.replace(',', '.');
            sum += parseFloat(a);
        });

        return sum / parseFloat(cnt);
    }

    console.dir(averageByAuthor);

    // task 3

    console.log('•	Get all books in English or German, with price below 30.00, and group them by author');

    var englishGermanCheapBooks = _.chain(books)
        .filter(function (book) {
            return (book.language == 'English' || book.language == 'German') && parseFloat(book.price) < 30
        })
        .groupBy(function (book) {
            return book.author;
        })
        .value();

    console.dir(englishGermanCheapBooks);
}());