var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    redis = require('redis');
    // io = require('socket.io').listen(server, {'log level': 1});

server.listen(process.env.VMC_APP_PORT || 8000);

app.use(app.router);
app.use(express.bodyParser());


// Given this Redis conection string:
// "redis://myDb:1234c6607579e81ff116374dc0cc4321@abc.redistogo.com:10108/"
// you can connect to your redistogo instance like so:
//redis://nodejitsu:nodejitsudb5424294227.redis.irstack.com:f327cfe980c971946e80b8e975fbebb4@nodejitsudb5424294227.redis.irstack.com:6379

// var clientRedis = redis.createClient();
var clientRedis = redis.createClient(6379, 'nodejitsudb5424294227.redis.irstack.com');
clientRedis.auth("nodejitsudb5424294227.redis.irstack.com:f327cfe980c971946e80b8e975fbebb4", function(err) {
  if (err) {
    throw err;
  }
});
clientRedis.on('ready', function () { // without this part, redis connection will fail
  // do stuff with your redis
});

clientRedis.on("error", function(err) {
  console.error("Error connecting to redis", err);
});


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
    res.render('problems/'+req.params.id+'.jade', {comment:req.params.id});
});

app.get('/problems/:id/comment', function (req, res) {
    clientRedis.set(req.params.id, req.query.comment);
    res.send('ok');
});
app.get('/problems/:id/comment/get', function (req, res) {
    clientRedis.get(req.params.id, function(err, comment){
        res.send(comment);
    })
});

// var connections = 0;

// app.get('/chat', function (req, res) {
//     console.log(connections+ ' get')
//     res.render('chat.jade');

//     io.sockets.on('connection', function(client) {
//         connections += 1;
//         console.log(connections+' clients connected...')

//         // client.on('messages', function(data) {
//         //     console.log(data)
//         // })

//         // client.emit('messages', {hello: 'world'})

//         client.on('disconnect', function() {
//         })
//     })
// });


