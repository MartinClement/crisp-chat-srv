import { Socket } from "socket.io";
type AppSocket = Socket<IClientToServerEvents, IServerToClientEvents>;

export default function addRoomListeners(socket: AppSocket) {
  const handleRoomCreate = ({
    user,
    roomName,
    callback,
  }: {
    user: GithubUser,
    roomName: string,
    callback: (payload: IRoomCreatedCallbackPayload) => void,
  }) => {
    const safeRoomId = `${user.name}-${roomName}`;
    socket.join(safeRoomId);
    callback({ roomId: safeRoomId });
  };

  socket.on('room:create', handleRoomCreate)
}