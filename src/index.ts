import express from "express";
import { Server } from "socket.io";
import http from "http";

import addRoomListeners from "./listeners.ts/roomListeners";
import { RoomStorage } from "./storage/RoomStorage";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  ...(process.env.MODE === 'dev' ? { cors: { origin: "*" } } : {}),
});

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express + Typescript Server');
});

const roomStorage = new RoomStorage();

io.on('connection', (socket) => {
  console.log('User connected');

  addRoomListeners(socket, roomStorage);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});