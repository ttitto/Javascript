$(function () {
    var headers = {
            'X-Parse-Application-Id': 'uPaYGHeiAXZEhQCet3lJoWt0mvWuClKDXmOY4TGV',
            'X-Parse-REST-API-Key': 'NzZlkbo49SUb8m3RkJ4bVyOXXRVnkFYoRQ0j74Nc'
        },
        countries = [],
        errorMessage = function (err, message) {
            var errorsDiv = $('<div />');
            errorsDiv.addClass('errors-container').html(message + ': ' + err).appendTo(document.body).fadeOut(4000);
            setTimeout(function () {
                errorsDiv.remove();
            }, 6000);
        },

        successMessage = function (message) {
            var successDiv = $('<div />');
            successDiv.addClass('success-message-container').html(message).appendTo(document.body).fadeOut(4000);
            setTimeout(function () {
                successDiv.remove();
            }, 6000);
        },

        loadCountries = function () {
            $.ajax({
                url: 'https://api.parse.com/1/classes/Country',
                type: 'GET',
                headers: headers,
                success: function (data) {
                    var countriesList = $('#countries-list');
                    countries = data.results;
                    countriesList.html('');

                    $.each(countries, function (index, country) {
                        $('<option />').addClass('country-item').html(country.name).appendTo(countriesList);
                    })

                    loadTowns(getSelectedCountry()[0].objectId);
                },
                error: function (err) {
                    errorMessage(err.responseText, "Error occurred when loading countries");
                }
            });
        };

    $('#countries-list').change(function () {
        loadTowns(getSelectedCountry()[0].objectId);
    });

    $('#country-add-btn').click(function () {
        var input = $('.country-input')[0];
        if (input) {
            $.ajax({
                url: 'https://api.parse.com/1/classes/Country',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({"name": input.value}),
                headers: headers,
                success: function () {
                    successMessage("New country successfully added");
                },
                error: function (err) {
                    errorMessage(err.responseText, 'Error occurred while adding new country');
                }
            });
            input.remove();
            loadCountries();
        } else {
            $('<input type="text" />').addClass('country-input').prependTo($(this).parent());
        }
    });

    $('#town-add-btn').click(function () {
        var input = $('.town-input')[0],
            selectedCountryId = '';
        if (input) {
            selectedCountryId = getSelectedCountry()[0].objectId;
            $.ajax({
                url: 'https://api.parse.com/1/classes/Town',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    'name': input.value,
                    'country': {
                        "__type": "Pointer",
                        "className": "Country",
                        "objectId":selectedCountryId
                    }
                }),
                headers: headers,
                success: function () {
                    successMessage("New town successfully added");
                },
                error: function (err) {
                    errorMessage(err.responseText, 'Error occurred while adding new town');
                }
            });
            input.remove();
            loadTowns(selectedCountryId);
        } else {
            $('<input type="text" />').addClass('town-input').prependTo($(this).parent());
        }
    });

    function getSelectedCountry() {
        var countryName = $('#countries-list').children(':selected').text();
        return countries.filter(function (country) {
            return countryName == country.name;
        });
    }

    function loadTowns(countryId) {
        $.ajax({
            url: 'https://api.parse.com/1/classes/Town',
            type: 'GET',
            headers: headers,
            success: function (data) {
                var towns = data.results.filter(function (country) {
                        return country['country'].objectId == countryId;
                    }),
                    townsList = $('#towns-list');

                townsList.html('');
                $.each(towns, function (index, town) {
                    $('<option />').addClass('town-item').html(town.name).appendTo(townsList);
                });
            },
            error: function (err) {
                errorMessage(err, 'Error occured when loading towns');
            }
        });
    }

    loadCountries();
});