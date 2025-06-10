const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

const PORT = process.env.PORT || 3000;

// Middleware pour fichiers statiques dans le dossier racine
app.use(express.static(__dirname));

// Route pour la page d’accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', socket => {
  let pseudo = 'Anonyme';

  socket.on('pseudo', name => {
    pseudo = name || 'Anonyme';
    socket.broadcast.emit('message', { pseudo: 'Système', message: `${pseudo} a rejoint le tchat` });
  });

  socket.on('message', msg => {
    io.emit('message', { pseudo, message: msg });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', { pseudo: 'Système', message: `${pseudo} a quitté le tchat` });
  });
});

http.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
