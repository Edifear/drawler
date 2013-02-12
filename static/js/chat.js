$(function( $, undefined ) {
    "use strict"

    window.server = io.connect('http://localhost:8000');

    server.on('connect', function() {
        console.log('connected')
    })

    server.on('messages', function(data) {
        console.log(data)
    })

    setInterval(function() {
        server.socket.disconnect();
    }, 2000)

})
