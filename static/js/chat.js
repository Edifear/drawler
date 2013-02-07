$(function( $, undefined ) {
    "use strict"

    var server = io.connect('http://localhost:8000');

    server.on('messages', function(data) {
        console.log(data)
    })

})