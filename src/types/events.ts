interface IMessageData {
  user: User,
  message: string,
  timestamp: Number,
}

interface IRoomCreatedPayload {
  roomId: string,
}

interface IClientToServerEvents {
  'room:create': (data: { user: User, roomName: string}, callback: (payload: IRoomCreatedPayload) => any) => void;
  'room:message': (data: { roomId: string, message: IMessageData }) => void;
  'room:join': (data: { user: User, roomId: string }, callback: ({ room }: { room: IRoom }) => any) => void;
}

interface IServerToClientEvents {
  'room:message': ({ message }: { message: IMessageData }) => void;
  'room:user_joined': ({ users }: { users: User[] }) => void;
  'error:message': ({ message }: { message: string }) => void;
}