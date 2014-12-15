$(function(){
    $('#insert-btn').click(function(){
        $('#renderer').html($('#input').val());
    });
    $('#paint-btn').click(function(){
        var className = $('#class-input').val(),
            color = $('#color-input');
        $('.'+className).css('background-color', color.val())
    });
});