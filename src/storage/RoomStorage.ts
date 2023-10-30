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

  #addRoomUser(users: User[], newUser: User) {
    if (users.find((user) => user.email === newUser.email)) {
      return users;
    }

    return [...users, newUser];
  }

  #removeRoomUser(users: User[], oldUser: User) {
    const userIndex = users.findIndex((user) => user.email === oldUser.email);

    if (userIndex === -1) {
      return users;
    }

    const newUsers = [...users];
    newUsers.splice(userIndex, 1);

    return newUsers;
  }

  #generateSafeRoomId(roomName: string, socketId: string) {
    return `${roomName}-${socketId}`;
  };

  #rotateMessages(messages: IMessage[], message:IMessage) {
    return [...messages, message].slice(messages.length > 9 ? 1 : 0);
  }

  createRoom({ roomId, user, socketId }: {roomId: string, user: User, socketId: string}) {

    if(this.#ROOMS[roomId]) {
      return this.#ROOMS[roomId];
    }

    /*
      In a real world,  this id won't came out like this and should be managed in an other way
      - DB id
      - real id gen
      - ...
    */
    const safeRoomId = this.#generateSafeRoomId(roomId, socketId);
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
        users: this.#addRoomUser(room.users, user),
      };

      this.#ROOMS[roomId] = newRoom;

      return newRoom;
    }

    throw new Error("ROOM_NOT_FOUND");
  }

  leaveRoom({ roomId, user }: {roomId: string, user: User}) {
    const room = this.#getRoom(roomId);

    if (room) {
      const newRoom = {
        ...room,
        users: this.#removeRoomUser(room.users, user),
      }

      this.#ROOMS[room.id] = newRoom;
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