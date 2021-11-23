import React, { useState, useEffect } from "react";
import io, { Socket } from 'socket.io-client';
import { User } from "../domain/user/User";
import Messages from "../Messages/Messages";
import RoomInfo from '../Room/RoomInfo';
import SendMessageBar from "../SendMessageBar/SendMessageBar";
import messageService from '../services/messageServices';
import userRepository from '../services/userServices';

const { getAllMessagesFromRoom } = messageService;
const { getUser } = userRepository;

type Props = {
  location: Location;
}

type Location = {
  pathName: string;
  search: string;
  hash: string;
  state: {data: {id: number ,name: string, room: { id: number, name: string}}};
}

type TypeMessage = {
  user: User;
  text: string;
  date: string;
}

let socket: Socket;

const Chat = ({ location }: Props) => {
  const [user, setUser] = useState<User>();
  const [room, setRoom] = useState<{id: number, name: string}>({id: 0, name:''});
  const [nbconnectedUsers, setConnectedUsers] = useState<number>(0)
  const [message, setMessage] =useState('');
  const [messages, setMessages] = useState<TypeMessage[]>([]);

  const ENDPOINT='http://localhost:8090';


  useEffect(() => {
    const {id, name , room} = location.state.data
    setRoom(room);
    getUser(id).then((user) => setUser(user))

    socket = io(ENDPOINT);

    getAllMessagesFromRoom(room.id).then((allMessages: any) => setMessages(allMessages));
    console.log('PASS');
    socket.emit('join', {id, room});

    return () => {
      socket.disconnect();
      //socket.off();
    }

  },[ENDPOINT, location.state.data])

  useEffect(() => {
    socket.on('message', ({user, messageToSend}) => {
      const {id, name, pseudo} = user;
      const userEmitter = new User(id, name, pseudo); 
      const { text, date } = messageToSend;

      const newMessage = {user: userEmitter, text, date};
      console.log('NEW MESSAGE : ', newMessage);
      setMessages([...messages, newMessage])
    })
  }, [message, messages])

  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if(user && message) {
      const userId: number = user.getId();
      socket.emit('sendMessage', {userId, message, room}, () => { setMessage('')})
    }
  }
  
  console.log('CHAT :', message, messages);

  if(user) {
    return (
      <div className="flex flex-col justify-between h-screen">
        <section className="flex flex-col ">
          <h1 className="mx-auto text-2xl"> My chat plug</h1>
          <RoomInfo room={room} nbconnectedUsers={nbconnectedUsers}/>
        </section>
        <section className="space-y-2">
          <Messages messages={ messages } user={ user }/>
          <div className="bottom-0">
            <SendMessageBar message={message} setMessage={setMessage} sendMessage={sendMessage}/>
          </div>
          
        </section>
      </div>
    )
  }
  else {
    return (
      <div>
        No user connected
      </div>
    )
  }
}

export default Chat;