type MessageData = {
  user: GithubUser,
  message: string,
  timestamp: Number,
}

interface IRoomCreatedCallbackPayload {
  roomId: string,
}

interface IClientToServerEvents {
  'room:create': ({
    user,
    roomName,
    callback
  }: {
    user: GithubUser,
    roomName: string,
    callback: ({ roomId }: IRoomCreatedCallbackPayload ) => any,
  }) => void;
  'room:message': ({ roomId, messageData }: { roomId: string, messageData: MessageData }) => void;
  'room:join': ({ user, roomId }: { user: GithubUser, roomId: string }) => void;
}

interface IServerToClientEvents {
  'room:message': ({ message }: { message: MessageData }) => void;
}