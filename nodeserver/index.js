// Node server which will handle node server socket io connections
// const express = require('express');
// const cors = require('cors');
// const app = express();
// var corsOptions = {
//     origin: function (origin, callback) {
//         // Loading a list of allowed origins from the database
//         // Ex.. origins = ['http://example.com', 'http//something.com']
//         database.loadOrigins((error, origins) => {
//             callback(error, origins);
//         });
//     }
// }

// app.use(cors(corsOptions));
const io = require('socket.io')(3000,{
    cors: {
      origin: '*',
    }
  });

const users = {}; 
// app.use(function(req, res, next){
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     next()
// })
// res.header("Access-Control-Allow-Origin", "*");
io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name : users[socket.id]})
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})