(function(){
    var persister = dataPersister.get('https://api.parse.com/1/classes/'),
        headers = {
            'X-Parse-Application-Id': '8M8g7JBQNDJkMfSURvanJa4S64StDTww49JSxIXp',
            'X-Parse-REST-API-Key': 'TQc46UlejgS6QFxXYXWc0UTNfC6ZrwKLQzm04tQ1'
        },
        booksController = new BooksController(persister, headers);

    booksController.getAll().then(function(data){
        console.log(data);
    });

}());