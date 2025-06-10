const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const { Server } = require('socket.io');

// Autoriser CORS pou tout orijin (Render, localhost, elatriye)
app.use(cors({
  origin: '*'
}));

// Serveur Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Serveur dosye statik si w gen frontend nan menm app
// app.use(express.static('public')); // ou retire si frontend separe

// Mape pou pseudo
const users = {};

io.on('connection', (socket) => {
  console.log('✅ Nouvo koneksyon:', socket.id);

  // Lè yon pseudo voye
  socket.on('pseudo', (pseudo) => {
    users[socket.id] = pseudo;
    socket.broadcast.emit('message', { pseudo: 'Système', message: `${pseudo} a rejoint le chat.` });
  });

  // Lè yon mesaj voye
  socket.on('message', (msg) => {
    const pseudo = users[socket.id] || 'Anonyme';
    io.emit('message', { pseudo, message: msg });
  });

  // Lè itilizatè dekonekte
  socket.on('disconnect', () => {
    const pseudo = users[socket.id];
    if (pseudo) {
      socket.broadcast.emit('message', { pseudo: 'Système', message: `${pseudo} a quitté le chat.` });
      delete users[socket.id];
    }
  });
});

// Port pou Render oswa lokal
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur Socket.IO en écoute sur le port ${PORT}`);
});
