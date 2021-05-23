var net = require('net');

var HOST = 'app_server';
var PORT = 8081;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
    console.log('KOMUNIKAT: ');
    client.write('\n\n WYSYŁAM DANE DO SERVERA! \n\n');

});

client.on('data', function(data) {

    console.log('DANE: ' + data);
    // Close the client socket 
    client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('POŁĄCZENIE ZAKONCZONE.');
});
