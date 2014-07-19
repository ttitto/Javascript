function replaceATag(value) {
    var rgx = /<a([^>]+)>(.+?)<\/a>/g;
    var match;
    while (match = rgx.exec(value)) {
        value = value.replace(match[0], "[URL" + match[1] + "]" + match[2] + "[/URL]")
    }
    return value;
}
console.log(replaceATag('<ul><li><a href=http://softuni.bg>SoftUni</a><a href=http://dir.bg>Dir.bg</a></li></ul>'));