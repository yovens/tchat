const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);
const path = require('path');

// Sert les fichiers statiques comme script.js
app.use(express.static(__dirname));

// Sert le fichier index.html manuellement
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.io - gestion des messages
io.on('connection', (socket) => {
  console.log('✅ Un utilisateur est connecté');

socket.on('chat message', (data) => {
  io.emit('chat message', data);
});



  socket.on('disconnect', () => {
    console.log('❌ Un utilisateur est déconnecté');
  });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
