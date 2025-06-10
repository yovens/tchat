const socket = io();

const messageInput = document.getElementById('messageInput');
const pseudoInput = document.getElementById('pseudoInput');
const sendBtn = document.querySelector('.send');
const messagesList = document.getElementById('messages');

// Envoi du message
sendBtn.addEventListener('click', () => {
  const message = messageInput.value.trim();
  const pseudo = pseudoInput.value.trim() || "Anonyme";

  if (message) {
    socket.emit('chat message', { pseudo, message });
    messageInput.value = '';
  }
});

// Réception des messages
socket.on('chat message', (data) => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${data.pseudo}</strong>: ${data.message}`;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
});
