var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app);

server.listen(process.env.VMC_APP_PORT || 8000);

app.use(app.router);
app.use(express.static(__dirname + "/static"))

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/drawling', function (req, res) {
    res.sendfile(__dirname + '/drawing.html');

    var io = require('socket.io').listen(server, {'log level': 2});

    io.sockets.on('connection', function (socket) {

        socket.on('line', function (data) {
          socket.broadcast.emit('line', data);
        });

        socket.on('msg', function (data) {
          socket.broadcast.emit('msg', data);
        });

    });
});

app.get('/problems/:id', function (req, res) {
    res.sendfile(__dirname + '/problems/problem-'+req.params.id+'.html');
});
