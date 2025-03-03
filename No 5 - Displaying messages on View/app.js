const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
});
const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'public')));

let socketsConnected = new Set();

io.on('connection', onConnected);

function onConnected(socket){
    console.log(socket.id);
    socketsConnected.add(socket.id);
    io.emit('clients-total', socketsConnected.size); 
    socket.on('disconnect', () =>{
        console.log('Socket disconnected', socket.id)
        socketsConnected.delete(socket.id);
        io.emit('clients-total', socketsConnected.size); 
    })

    socket.on('message', (data) => {
        socket.broadcast.emit('chat-message', data);
    })
}

