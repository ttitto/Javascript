$(function () {
    $('#json-input').blur(function () {
        var json = $(this).val(),
            arr = $.parseJSON(json),
            isHeaderFilled = false,
            tbody,
            theadRow;

        $(document.body).append($('<table id="table"><thead><tr></tr></thead><tbody></tbody></table>'));

        tbody = $('#table').find('tbody');
        theadRow = $('#table').find('thead tr');

        $.each(arr, function (objIndex, elem) {
            var tr = $('<tr></tr>');
            $.each(elem, function (key, val) {
                if (isHeaderFilled == false) {
                    $(theadRow).append($('<th>' + key + '</th>'));
                }
                tr.append($('<td>' + val + '</td>'));
            });
            tbody.append(tr);
            isHeaderFilled = true;
        });
    });
});