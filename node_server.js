var http = require('http');
var fs = require('fs');
var io = require('socket.io')


var server = http.createServer(function (req, res) {
    //console.log(req);
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(__dirname +'/www/index.html',function(err,contents){
      res.end(contents);
  })
}).listen(8124, "127.0.0.1");


var ioServer = io.listen(server);
ioServer.set('log level', 1);

//Send data when io on function is called with 'connection'
ioServer.sockets.on('connection', function(socket){
    socket.emit('message', {'message': 'hello world'});
    
    socket.on('client_data', function(data){
            socket.emit('message', {'message': data.letter});
            ioServer.sockets.emit('message',{'message': data.letter});
            });
});



console.log('Server running at http://127.0.0.1:8124/');

//End