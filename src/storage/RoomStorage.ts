export class RoomStorage {
  #ROOMS: {
    [id: string]: IRoom,
  };

  constructor() {
    this.#ROOMS = {};
  }

  #getRoom(roomId: string ) {
    return this.#ROOMS[roomId];
  }

  #generateRoomId(roomName: string) {
    return `${roomName}-kapoue`;
  };

  #rotateMessages(messages: IMessageData[], message:IMessageData) {
    return [...messages, message].slice(messages.length > 10 ? 1 : 0);
  }

  createRoom({ roomName, user }: { roomName: string, user: User }) {
    const roomId = this.#generateRoomId(roomName);

    if (this.#ROOMS[roomId]) {
      throw new Error('ROOM_NOT_AVAILABLE');
    }
  
    const newRoom: IRoom = {
      id: roomId,
      users: [],
      owner: user.nickname,
      messages: [],
    };

    this.#ROOMS[roomId] = newRoom;

    return newRoom;
  };

  joinRoom({ roomId, user }: {roomId: string, user: User}) {
    const room = this.#getRoom(roomId);

    if (room) {
      const newRoom = {
        ...room,
        users: [...room.users, user],
      };

      this.#ROOMS[roomId] = newRoom;

      return newRoom;
    }

    throw new Error("ROOM_NOT_FOUND");
  }

  addMessage({ roomId, message }: { roomId: string, message: IMessageData}) {
    const room = this.#getRoom(roomId);

    if (room) {
      const newRoom = {
        ...room,
        messages: this.#rotateMessages(room.messages, message),
      }

      this.#ROOMS[roomId] = newRoom;

      return room;
    } else {
      throw Error('ROOM_NOT_FOUND');
    }
  }

}