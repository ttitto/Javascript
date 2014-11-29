(function () {
    $(function () {
        var baseUrl = 'https://api.parse.com/1/classes/',
            dataPersister = PollSystemApp.dataPersister.get(baseUrl),
            headers = {
                'X-Parse-Application-Id': 'dCTlmZftfLumXETjHq9Or2Ll9bMDxb54X225qQZx',
                'X-Parse-REST-API-Key': '0WzEpXvKPQCsK892uA6bUP19NFXEWztIBsEMh0kT'
            },
            pollController = new PollSystemApp.PollsController(dataPersister, headers),
            questionsController = new PollSystemApp.QuestionsController(dataPersister, headers);

        pollController.loadActive('#polls-list');

        $('.poll').on('click', function () {
            var thisId = $(this).attr('data-id');
            questionsController.load('#questions-area', thisId);
        });
    })

}());