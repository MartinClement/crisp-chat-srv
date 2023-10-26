import express from "express";
import { Server } from "socket.io";
import http from "http";

import addRoomListeners from "./listeners.ts/roomListeners";

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

const port = 1337;

app.get('/', (req, res) => {
  res.send('Express + Typescript Server');
});

io.on('connection', (socket) => {
  console.log('User connected');

  addRoomListeners(socket);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});