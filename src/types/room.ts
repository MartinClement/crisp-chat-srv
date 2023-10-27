interface IRoom {
  id: string,
  users: User[],
  owner: string,
  messages: IMessageData[],
}