import { Socket } from "socket.io";
type AppSocket = Socket<IClientToServerEvents, IServerToClientEvents>;

export default (socket: AppSocket) => {
  console.log("register room events");
  socket.on('room:create', ({ user, roomName }, callback) => {
    console.log("Event received");
    const safeRoomId = `${user.name}-${roomName}`;

    socket.join(safeRoomId);

    callback({ roomId: safeRoomId })
  });
};