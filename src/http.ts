import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

// Servidor para as rotas
const app = express();

// Quero acessar estáticamente tudo da pasta public
app.use(express.static(path.join(__dirname, "..", "public")));

// Reproveitando o servidor
const serverHttp = http.createServer(app);

// Criando o servidor socket a partir server de rotas
const io = new Server(serverHttp);

export { serverHttp, io };