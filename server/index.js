// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const socketIo = require("socket.io");
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("incomingCall", {
      signal: data.signal,
      from: data.from,
    });
  });

  socket.on("acceptCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.to).emit("messageReceived", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => console.log("Server is running on port 5000"));
