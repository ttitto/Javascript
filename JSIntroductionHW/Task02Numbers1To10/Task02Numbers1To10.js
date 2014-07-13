//var http = require('http');
//var server = http.createServer(
//    function (req, res) {
//        res.writeHead(200, {'Content-Type': 'text/plain'});
//        res.end('Hello world!\n');
//    }
//)
//server.listen(1337);

function loop1to10() {
    for (var i = 1; i <= 10; i++) {
        console.log(i);
    }
}
loop1to10();