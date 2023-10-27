"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const roomListeners_1 = __importDefault(require("./listeners.ts/roomListeners"));
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: "*" },
});
const port = 1337;
app.get('/', (req, res) => {
    res.send('Express + Typescript Server');
});
io.on('connection', (socket) => {
    console.log('User connected');
    (0, roomListeners_1.default)(socket);
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
httpServer.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
