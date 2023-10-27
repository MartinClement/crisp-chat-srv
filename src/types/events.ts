type MessageData = {
  user: User,
  message: string,
  timestamp: Number,
}

interface IRoomCreatedPayload {
  roomId: string,
}

interface IClientToServerEvents {
  'room:create': (data: { user: User, roomName: string}, callback: (payload: IRoomCreatedPayload) => any) => void;
  'room:message': (data: { roomId: string, messageData: MessageData }) => void;
  'room:join': (data: { user: User, roomId: string }) => void;
}

interface IServerToClientEvents {
  'room:message': ({ message }: { message: MessageData }) => void;
}