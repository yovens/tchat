let pseudo = '';

document.getElementById('confirmPseudo').addEventListener('click', () => {
  const input = document.getElementById('pseudoInput');
  if (input.value.trim() !== '') {
    pseudo = input.value.trim();
    document.getElementById('pseudoModal').style.display = 'none';
  }
});

// Connexion socket après que le pseudo soit défini
const socket = io();

// Envoi du message
document.querySelector('.send').addEventListener('click', () => {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  if (message && pseudo) {
    socket.emit('chat message', { pseudo, message });
    input.value = '';
  }
});

// Affichage du message
const messages = document.getElementById('messages');
socket.on('chat message', (data) => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${data.pseudo}</strong>: ${data.message}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});
