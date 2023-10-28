interface IMessage {
  user: User,
  message: string,
  timestamp: Number,
}

interface IRoomCreatedPayload {
  roomId: string,
}

interface IRoomMessagePayload {
  status: 'error' | 'ok',
}

interface IClientToServerEvents {
  'room:create': (data: { user: User, roomId: string }, callback: (payload: IRoomCreatedPayload) => any) => void;
  'room:message': (data: { roomId: string, message: IMessage }, callback: (payload: IRoomMessagePayload) => any) => void;
  'room:join': (data: { user: User, roomId: string }, callback: ({ room }: { room: IRoom }) => any) => void;
}

interface IServerToClientEvents {
  'room:message': ({ message }: IMessage ) => void;
  'room:user_joined': ({ user }: { user: User }) => void;
  'error:message': ({ message }: { message: string }) => void;
}