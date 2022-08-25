const socket = io();

// Se estiver rodando em outra porta, utilize o 
// const socket = io("http://localhost:3000");

// Tendo acesso às informações que estão vindo no parâmetro da requisição
const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

// emit => emitir alguma informação
// on => escutando alguma informação

// Nome do evento e os dados que serão enviados pelo socket
socket.emit("select_room", {
    username,
    room
})

// Pegando a mensagem
document.getElementById("message_input").addEventListener("keypress", (event) => {
    
    // Se o usuário apertar "enter" ...
    if (event.key === "Enter") {

        // Salva o texto do campo de mensagem na constante
        const message = event.target.value;

        // Salvando os dados que serão enviados
        const data = {
            room,
            message,
            username
        }

        socket.emit("message", data);

        // Limpa o campo de mensagem
        event.target.value = "";
    }
})

console.log(username, room);





























// const socket = io();

// const urlSearch = new URLSearchParams(window.location.search);
// const username = urlSearch.get('username');
// const room = urlSearch.get('select_room');

// const usernameDiv = document.getElementById("username");
// usernameDiv.innerHTML = `Olá <strong>${username}</strong> - Você está na sala <strong>${room}</strong>`

// socket.emit("select_room", {
//   username,
//   room
// }, messages => {
//   messages.forEach(message => createMessage(message));
// });

// document.getElementById("message_input").addEventListener("keypress", (event) => {
//   if(event.key === 'Enter') {
//     const message = event.target.value;

//     const data = {
//       room,
//       message,
//       username
//     }

//     socket.emit("message", data);

//     event.target.value = "";
//   }
// });

// socket.on("message", data => {
//   createMessage(data);
// });

// function createMessage(data) {
//   const messageDiv = document.getElementById("messages");

//   messageDiv.innerHTML +=`
//   <div class="new_message">
//     <label class="form-label">
//       <strong>${data.username}</strong> <span>${data.text} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}</span>
//     </label>
//   </div>
//   `;
// };

// document.getElementById("logout").addEventListener("click", (event) => {
//   window.location.href = "index.html";
// })