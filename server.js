const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

const utilisateurs = {};

io.on('connection', (socket) => {
  socket.on('nouveau_user', (pseudo) => {
    utilisateurs[socket.id] = pseudo;
    socket.broadcast.emit('system', `${pseudo} a rejoint le tchat.`);
  });

  socket.on('message_chat', (data) => {
    io.emit('message_chat', data);
  });

  socket.on('disconnect', () => {
    const pseudo = utilisateurs[socket.id];
    if (pseudo) {
      io.emit('system', `${pseudo} a quitté le tchat.`);
      delete utilisateurs[socket.id];
    }
  });
});

http.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
