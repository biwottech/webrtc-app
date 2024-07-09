require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const routes = require("./routes/index");
const app = express();

app.use(express.json());
app.use(express.urlencoded({}));
app.use(cors());

app.use("/api", routes);

const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  socket.on("call", (data) => {
    console.log("Call data:", data);
    socket.to(data.to).emit("call", data);
  });

  socket.on("answer", (data) => {
    console.log("Answer data:", data);
    socket.to(data.to).emit("answer", data);
  });

  socket.on("ice-candidate", (data) => {
    console.log("ICE Candidate data:", data);
    socket.to(data.to).emit("ice-candidate", data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
