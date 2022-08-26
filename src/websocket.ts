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
    // Com o callback, iremos retornar as mensagens da sala para o usuário 
    socket.on("select_room", (data, callback) => {
        
        // Conectando o usuário à sala
        socket.join(data.room);

        // Verificando se o usuário já está conectado a sala (para situações de reload)
        const userInRoom = users.find(user => (user.username === data.username) && (user.room === data.room));

        // Verificando se já existe um username igual

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

        const messagesRoom = getMessagesRoom(data.room);
        callback(messagesRoom);
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

        // Armazenando a mensagem em um array que o usuário criou
        messages.push(message);

        // Como desejamos enviar a mensagem para todo o servidor, utilizamos o "IO"
        // Enviar (io.to()) mensagem (evento "message" com os dados de "message")
        // Para os usuários da sala (data.room)
        io.to(data.room).emit("message", message);
    });
});

// Função para retornar as mensagens da sala
function getMessagesRoom(room: string) {

    // Filtrando todas as mensagens com base na sala para recuperar somente as mensagens da sala específica
    const messagesRoom = messages.filter(message => message.room === room);
    return messagesRoom;
}