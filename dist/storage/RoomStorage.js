"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RoomStorage_instances, _RoomStorage_ROOMS, _RoomStorage_getRoom, _RoomStorage_generateSafeRoomId, _RoomStorage_rotateMessages;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomStorage = void 0;
class RoomStorage {
    constructor() {
        _RoomStorage_instances.add(this);
        _RoomStorage_ROOMS.set(this, void 0);
        __classPrivateFieldSet(this, _RoomStorage_ROOMS, {}, "f");
    }
    ;
    createRoom({ roomId, user }) {
        if (__classPrivateFieldGet(this, _RoomStorage_ROOMS, "f")[roomId]) {
            return __classPrivateFieldGet(this, _RoomStorage_ROOMS, "f")[roomId];
        }
        const safeRoomId = __classPrivateFieldGet(this, _RoomStorage_instances, "m", _RoomStorage_generateSafeRoomId).call(this, roomId);
        const newRoom = {
            id: safeRoomId,
            users: [],
            owner: user.email,
            messages: [],
        };
        __classPrivateFieldGet(this, _RoomStorage_ROOMS, "f")[safeRoomId] = newRoom;
        console.log(JSON.stringify(__classPrivateFieldGet(this, _RoomStorage_ROOMS, "f")[safeRoomId]));
        return newRoom;
    }
    ;
    joinRoom({ roomId, user }) {
        const room = __classPrivateFieldGet(this, _RoomStorage_instances, "m", _RoomStorage_getRoom).call(this, roomId);
        if (room) {
            const newRoom = Object.assign(Object.assign({}, room), { users: [...room.users, user] });
            __classPrivateFieldGet(this, _RoomStorage_ROOMS, "f")[roomId] = newRoom;
            return newRoom;
        }
        throw new Error("ROOM_NOT_FOUND");
    }
    addMessage({ roomId, message }) {
        const room = __classPrivateFieldGet(this, _RoomStorage_instances, "m", _RoomStorage_getRoom).call(this, roomId);
        if (room) {
            const newRoom = Object.assign(Object.assign({}, room), { messages: __classPrivateFieldGet(this, _RoomStorage_instances, "m", _RoomStorage_rotateMessages).call(this, room.messages, message) });
            __classPrivateFieldGet(this, _RoomStorage_ROOMS, "f")[roomId] = newRoom;
            return room;
        }
        else {
            throw Error('ROOM_NOT_FOUND');
        }
    }
}
exports.RoomStorage = RoomStorage;
_RoomStorage_ROOMS = new WeakMap(), _RoomStorage_instances = new WeakSet(), _RoomStorage_getRoom = function _RoomStorage_getRoom(roomId) {
    return __classPrivateFieldGet(this, _RoomStorage_ROOMS, "f")[roomId];
}, _RoomStorage_generateSafeRoomId = function _RoomStorage_generateSafeRoomId(roomName) {
    return `${roomName}-kapoue`;
}, _RoomStorage_rotateMessages = function _RoomStorage_rotateMessages(messages, message) {
    return [...messages, message].slice(messages.length > 10 ? 1 : 0);
};
