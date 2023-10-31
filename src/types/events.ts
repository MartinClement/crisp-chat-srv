interface IMessage {
  user: User,
  message: string,
  timestamp: number,
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
  'room:leave': (data: { user: User; roomId: string }) => void;
  'room:user_kick': (data: { user: User; roomId: string }) => void;
}

interface IServerToClientEvents {
  'room:message': ({ message }: IMessage ) => void;
  'room:users': ({ users }: { users: User[] }) => void;
  'room:kick': () => void;
  'error:message': ({ message }: { message: string }) => void;
}