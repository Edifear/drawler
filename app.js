var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

server.listen(process.env.VMC_APP_PORT || 80);

app.use(app.router);
app.use(express.static(__dirname + "/static"))

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/drawing.html');
});

io.sockets.on('connection', function (socket) {

    socket.on('line', function (data) {
      socket.broadcast.emit('line', data);
    });

    socket.on('msg', function (data) {
      socket.broadcast.emit('msg', data);
    });

});
