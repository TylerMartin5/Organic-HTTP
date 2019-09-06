const net = require('net');
const fs = require('fs');

const HOST = '0.0.0.0';
const PORT = 6969;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
  // We have a connection - a socket object is assigned to the connection automatically
 console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
  // Add a 'data' event handler to this instance of socket
  sock.on('data', function(data) {
    console.log('DATA ' + sock.remoteAddress + ': ' + data);
    fs.readFile('inndex.html', (err, fileContent) => {
      if (err) {
        sock.write(`HTTP/1.1 404 Not Found
Content-Type: text/html
Connection: keep-alive        

<h1>404: File not found</h1>
`)
      } else {
        sock.write(`HTTP/1.1 200 OK
Content-Type: text/html
Connection: keep-alive

${fileContent}
`); 
      };
      
    })
    // Write the data back to the socket, the client will receive it as data from the server
   
  });
  // Add a 'close' event handler to this instance of socket
 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);