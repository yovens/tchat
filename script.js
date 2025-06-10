const socket = io();

let pseudo = prompt("Ton pseudo ?")?.trim();
socket.emit('pseudo', pseudo || 'Anonyme');

const messagesList = document.getElementById('messages');
const input = document.getElementById('messageInput');
const btn = document.querySelector('.send');

socket.on('message', data => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${data.pseudo}</strong>: ${data.message}`;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
});

btn.addEventListener('click', () => {
  const msg = input.value.trim();
  if (msg) {
    socket.emit('message', msg);
    input.value = '';
  }
});
