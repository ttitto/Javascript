function solve(args) {
    var row = 0;
    var inputArr = [];
    var rgx = /<a.*?href\s*=\s*\"(.*?)\"|<a.*?href\s*=\s*\'(.*?)\'/g;
    var replRegx = /(<a.*?href\s*=\s*)(\')(.*?)(\')/g;
    var resultArr = [];

    while (typeof (args[row]) !== 'undefined') {
        inputArr.push(args[row]);
        row++;
    }
    var input = inputArr.join('');

    //replace
    input = input.replace(replRegx, "$1\"&3\"");

    var match;
    while (match = rgx.exec(input)) {
        if (typeof(match[1]) !== 'undefined') {
            resultArr.push(match[1]);
        }
    }


    console.log(resultArr.join('\n'));
}//end of solve function

solve([
        "<!DOCTYPE html>",
        "<html>",
        "<head>",
        "  <title>Hyperlinks</title>",
        "  <link href=\"theme.css\" rel=\"stylesheet\" />",
        "</head>",
        "<body>",
        '<ul><li><a   href="/"  id="home">Home</a></li><li><a',
        ' class="selected" href="/courses">Courses</a>',
        '</li><li><a href = ',
        "'/forum' >Forum</a></li><li><a class=\"href\"",
        'onclick="go()" href= "#">Forum</a></li>',
        '<li><a id="js" href =',
        '"javascript:alert(\'hi\')" class="new">click</a></li>',
        "<li><a id='nakov' href =",
        "'http://www.nakov.com' class='new'>nak</a></li></ul>",
        '<a href="#"></a>',
        '<a id="href">href=\'fake\'<img src=\'http://abv.bg/i.gif\' ',
        "alt='abv'/></a><a href=\"#\">&lt;a href='hello'&gt;</a>",
        "<!-- This code is commented:",
        "  <a href=\"#commented\">commentex hyperlink</a> -->",
        "</body>"
    ]
);