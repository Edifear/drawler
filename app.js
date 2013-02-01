var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app);
    // io = require('socket.io').listen(server, {'log level': 1});

server.listen(process.env.VMC_APP_PORT || 8000);

app.use(app.router);

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


