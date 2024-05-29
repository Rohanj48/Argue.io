
const express = require('express');
const cors = require('cors');
const { Server } = require("socket.io");
const http = require("http");
const { Socket } = require('dgram');
const { ChatManager } = require('./chatManager');


// create app instance
const app = express();
const port = 3000;

// middle ware functions
app.use(express.json());
app.use(cors());

// http server
const httpServer = http.createServer(app);

// for socket io 
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

const Manager = new ChatManager();

io.on("connection", (socket) => {
    console.log(`User with id ${socket.id} Conneced`);

    socket.on("join", (data) => {
        console.log(data);
        Manager.addUserMeathod(socket.id, data, socket, io);
        socket.broadcast.emit("recv_msg", data);
    })


})

httpServer.listen(port, () => {
    console.log(`Server Running on ${port}`);
});


