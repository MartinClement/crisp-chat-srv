"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (socket) => {
    console.log("register room events");
    socket.on('room:create', ({ user, roomName }, callback) => {
        console.log("Event received");
        const safeRoomId = `${user.name}-${roomName}`;
        socket.join(safeRoomId);
        callback({ roomId: safeRoomId });
    });
};
