(function ($) {
    $.fn.treeView = function (options) {
        var settings = {};
        $.extend(settings, this.treeView.defaults, options);
        console.dir(settings['imageUrl']);
//        $('.treeView-item').css('background-color', 'red');
        $('.treeView-item:before').css('background-image', 'url(' + settings['imageUrl'] + ')');
        console.dir('url(\"' + settings['imageUrl'] + '\")');
        return this;
    }

    $.fn.treeView.defaults = {
        imageUrl: 'imgs/btn.jpg'
    }
})(jQuery);

$(function(){
    $().treeView();
});