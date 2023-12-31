import express from "express";
import expressConfig from "./config";
import { Server } from "socket.io";
import http from "http";

import addRoomListeners from "./listeners.ts/roomListeners";
import { RoomStorage } from "./storage/RoomStorage";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const corsSettings = process.env.MODE === 'dev' ?
{ cors: { origin: "*" } } :
{ cors: {
  origin: [
    'http://localhost:*',
    'https://crisp-chat.vercel.app',
    'https://crisp-chat*.vercel.app/',
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Access-Control-Allow-Credentials"],
  credentials: true,
}};

console.log('CORS SETTINGS: ', JSON.stringify(corsSettings));

const io = new Server(httpServer, {
  ...corsSettings
});

const port = process.env.PORT;

expressConfig(app);
app.get('/', (req, res) => {
  res.send('Express + Typescript Server');
});

const roomStorage = new RoomStorage();
const ROOM_CLEANING_INTERVAL = process.env.ROOM_CLEANING_INTERVAL;
if (ROOM_CLEANING_INTERVAL) {
  console.log("CLEAN ROOM INTERVAL DEFINED: ", ROOM_CLEANING_INTERVAL);
  setInterval(() => {
    roomStorage.cleanEmptyRooms();
  }, parseInt(ROOM_CLEANING_INTERVAL))
}


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