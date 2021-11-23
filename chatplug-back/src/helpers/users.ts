import { User } from "../domain/User";

const users: Array<User> = [];

const addUser = ({ id, name, room}: {id: number, name:string, room: string}) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  let error;
  const existingUser = users.find((user: User) => user.getId() === id);

  if(existingUser) {
    error =  'Username is taken';
  }

  const user = new User(id, name, room);

  users.push(user);

  return {error, user}; 
}

const removeUser = (id: number) => {
  const index = users.findIndex((user: User) => user.getId() === id);

  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
}

const getUser = (id: number) => users.find((user => user.getId() === id));

const getUsersInRoom = (room: string) => users.filter((user) => user.getRoom() === room.trim().toLowerCase())

module.exports = { addUser, removeUser, getUser, getUsersInRoom}