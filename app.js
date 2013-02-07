var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    redis = require('redis'),
    io = require('socket.io').listen(server, {'log level': 1});

server.listen(process.env.VMC_APP_PORT || 8000);

app.use(app.router);

var clientRedis = redis.createClient();
clientRedis.on("error", function(err) {
  console.error("Error connecting to redis", err);
});

console.log(clientRedis)

//set path to the views (template) directory
app.set({'views': __dirname + '/views'});

//set path to static files
app.use(express.static(__dirname + '/static'));

//handle GET requests on /
app.get('/', function(req, res){
    res.render('index.jade');
});

app.get('/problems', function (req, res) {
    res.render('problems.jade');
});

app.get('/problems/:id', function (req, res) {
    res.render('problems/'+req.params.id+'.jade');
});

app.get('/chat', function (req, res) {
    res.render('chat.jade');

    io.sockets.on('connection', function(client) {
        console.log('client connected...')

        client.emit('messages', {hello: 'world'})
    })
});


