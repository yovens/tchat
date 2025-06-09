const socket = io();

let pseudo = "";
while (!pseudo || pseudo.length < 2) {
  pseudo = prompt("Entre ton pseudo :").trim();
}
socket.emit("nouveau_user", pseudo);

// Éléments HTML
const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const button = document.querySelector("button.send");

function ajouterMessage(texte, system = false) {
  const li = document.createElement("li");
  li.innerHTML = texte;
  if (system) li.classList.add("system-message");
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
}

// Envoyer un message
function envoyerMessage() {
  const message = input.value.trim();
  if (message !== "") {
    socket.emit("message_chat", { pseudo, message });
    input.value = "";
  }
}

button.addEventListener("click", envoyerMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") envoyerMessage();
});

socket.on("message_chat", (data) => {
  ajouterMessage(`<strong>${data.pseudo}:</strong> ${data.message}`);
});

socket.on("system", (msg) => {
  ajouterMessage(msg, true);
});
