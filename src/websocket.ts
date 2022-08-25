import { io } from "./http";

interface RoomUser {
    socket_id: string,
    username: string,
    room: string
}

interface Message {
    room: string,
    text: string,
    createdAt: Date,
    username: string
}

// Array dos usuários conectados
const users: RoomUser[] = [];

const messages: Message[] = [];

// Permitindo que o cliente se conecte à aplicação
io.on("connection", socket => {

    // Permitindo o socket receber as informações do evento "select_room"
    socket.on("select_room", (data) => {
        
        // Conectando o usuário à sala
        socket.join(data.room);

        // Verificando se o usuário já está conectado a sala (para situações de reload)
        const userInRoom = users.find(user => (user.username === data.username) && (user.room === data.room));

        // Se ele estiver ...
        if (userInRoom) {
            // Altera o socket.id
            userInRoom.socket_id = socket.id
        } 
        // Se ele não estiver ...
        else {
            // Adiciona o usuário ao array de usuários
            users.push({
                room: data.room,
                username: data.username,
                socket_id: socket.id
            });
        }
    });

    // Socket para ouvir o evento "message" e receber os dados "data"
    socket.on("message", data => {
        // Salvar as mensagens (cenário ideal: salvar em um banco de dados);
        const message: Message = {
            room: data.room,
            username: data.username,
            text: data.message,
            createdAt: new Date()
        }

        // Armazenando a mensagem que o usuário cruou
        messages.push(message);

        // Enviar para os usuários da sala
        // Como desejamos enviar a mensagem para todo o servidor, utilizamos o "IO"
    })
});