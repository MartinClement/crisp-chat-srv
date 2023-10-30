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

  #generateSafeRoomId(roomName: string) {
    return `${roomName}-kapoue`;
  };

  #rotateMessages(messages: IMessage[], message:IMessage) {
    return [...messages, message].slice(messages.length > 10 ? 1 : 0);
  }

  createRoom({ roomId, user }: { roomId: string, user: User }) {

    if(this.#ROOMS[roomId]) {
      return this.#ROOMS[roomId];
    }

    const safeRoomId = this.#generateSafeRoomId(roomId);
    const newRoom: IRoom = {
      id: safeRoomId,
      users: [],
      owner: user.email,
      messages: [],
    };

    this.#ROOMS[safeRoomId] = newRoom;

    console.log(JSON.stringify(this.#ROOMS[safeRoomId]))

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

  addMessage({ roomId, message }: { roomId: string, message: IMessage}) {
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