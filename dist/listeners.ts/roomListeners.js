"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (socket, storage) => {
    const handleError = (error) => {
        console.log(error);
        if (error instanceof Error) {
            socket.emit("error:message", { message: error.message });
        }
        else {
            socket.emit("error:message", { message: "UNKNOWN_ERROR" });
        }
    };
    socket.on('room:create', ({ user, roomId }, callback) => {
        try {
            const room = storage.createRoom({ user, roomId });
            callback({ roomId: room.id });
        }
        catch (err) {
            handleError(err);
        }
    });
    socket.on("room:join", ({ user, roomId }, callback) => {
        try {
            const room = storage.joinRoom({ roomId, user });
            socket.join(room.id);
            socket.to(room.id).emit('room:user_joined', { user });
            callback({ room });
        }
        catch (err) {
            handleError(err);
        }
    });
    socket.on("room:message", ({ roomId, message }, callback) => {
        try {
            const room = storage.addMessage({ roomId, message });
            socket.to(room.id).emit('room:message', message);
            callback({ status: 'ok' });
        }
        catch (err) {
            callback({ status: "error" });
            handleError(err);
        }
    });
};
