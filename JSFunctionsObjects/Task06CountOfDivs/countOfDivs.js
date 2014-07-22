function countDivs(html) {
    var rgx = /<div>/g;
    var cnt = 0;
    while (rgx.exec(html)) {
        cnt++;
    }
    return cnt;
}

console.log(countDivs(
        '<!DOCTYPE html>' +
        '<html>' +
        '<head lang="en">' +
        '<meta charset="UTF-8">' +
        '<title>index</title>' +
        '<script src="/yourScript.js" defer></script>' +
        '</head>' +
        '<body>' +
        '<div>' +
        '<div>' +
        '<div><div>hello</div></div>' +
        '</div>' +
        '<div>hi<div></div></div>' +
        '<div>I am a div</div>' +
        '</div>' +
        '</body>' +
        '</html>'
));