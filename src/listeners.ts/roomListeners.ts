import { Socket } from "socket.io";
import { RoomStorage } from "../storage/RoomStorage";
type AppSocket = Socket<IClientToServerEvents, IServerToClientEvents>;

export default (socket: AppSocket, storage: RoomStorage) => {
  const handleError = (error: any) => {
    console.log(error);
    if (error instanceof Error) {
      socket.emit("error:message", { message: error.message });
    } else {
      socket.emit("error:message", { message: "UNKNOWN_ERROR" });
    }
  };

  socket.on('room:create', ({ user, roomName }, callback) => {
    try {
      const room = storage.createRoom({ user, roomName });
      callback({ roomId: room.id });
    } catch (err) {
      handleError(err);
    }
  });

  socket.on("room:join", ({ user, roomId }, callback) => {
    try {
      const room = storage.joinRoom({ roomId, user});
      socket.to(room.id).emit('room:user_joined', { users: room.users });
      callback({ room })
    } catch (err) {
      handleError(err);
    }
  });

  socket.on("room:message", ({ roomId, message }) => {
    try {
      const room = storage.addMessage({ roomId, message});

      socket.to(room.id).emit('room:message', { message });
    } catch (err) {
      handleError(err);
    }
  });
};