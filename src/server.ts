import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // allow frontend dev server
});

// Log connections
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("ping", (msg) => {
    console.log("Ping received:", msg);
    socket.emit("pong", "Pong from server!");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
