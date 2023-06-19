import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
// app.use(dotenv());
dotenv.config();
// console.log(process.env);

const httpServer = app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello welcome to chat");
});

const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT },
});

io.on("connection", (socket) => {
  socket.on("con", (data) => {
    socket.username = data;
    socket.broadcast.emit("iAmCon", data);
  });

  socket.on("sendMsg", (data) => {
    io.sockets.emit("receiveMsg", data);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("iAmDis", socket.username);
  });
});

// https://easilychat.netlify.app
