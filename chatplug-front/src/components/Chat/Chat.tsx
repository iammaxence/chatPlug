import React, { useState, useEffect } from "react";
import io, { Socket } from 'socket.io-client';
import { User } from "../domain/user/User";
import Messages from "../Messages/Messages";
import RoomInfo from '../Room/RoomInfo';
import SendMessageBar from "../SendMessageBar/SendMessageBar";
import messageService from '../../services/message/messageServices';
import { useSelector } from "react-redux";

const { getAllMessagesFromRoom } = messageService;

type Props = {
  location: Location;
}

type Location = {
  pathName: string;
  search: string;
  hash: string;
  state: {data: {id: number, room: { id: number, name: string}}};
}

type TypeMessage = {
  user: User;
  text: string;
  date: string;
}

let socket: Socket;

const Chat = ({ location }: Props) => {
  const user: User = useSelector((state: any) => state.user)
  const [room, setRoom] = useState<{id: number, name: string}>({id: 0, name:''});
  const [nbconnectedUsers, setConnectedUsers] = useState<number>(0)
  const [message, setMessage] =useState('');
  const [messages, setMessages] = useState<TypeMessage[]>([]);

  const ENDPOINT='http://localhost:8090';


  useEffect(() => {
    const { room } = location.state.data
    setRoom(room);
    const idUser = user.getId();

    socket = io(ENDPOINT);

    getAllMessagesFromRoom(room.id).then((allMessages: any) => setMessages(allMessages));
    socket.emit('join', {id: idUser, room});
    console.log('EXECUTE 1 FOIS');
    return () => {
      //socket.disconnect();
      socket.off();
    }

  },[ENDPOINT, user, location.state.data])

  useEffect(() => { 
    socket.once('message', ({user, messageToSend}) => {
      const {id, name, pseudo} = user;
      const userEmitter = new User(id, name, pseudo); 
      const { text, date } = messageToSend;

      const newMessage = {user: userEmitter, text, date};
      console.log('NEW MESSAGE : ', newMessage);
      setMessages([...messages, newMessage])
    })
  }, [messages])

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
        <section className="flex flex-col fixed w-full">
          <h1 className="mx-auto text-2xl"> My chat plug</h1>
          <RoomInfo room={room} nbconnectedUsers={nbconnectedUsers}/>
        </section>
        <section className="flex flex-col-reverse mt-20 overflow-auto">
          <Messages messages={ messages } user={ user }/>  
        </section>
        <section className="bottom-0">
          <SendMessageBar message={message} setMessage={setMessage} sendMessage={sendMessage}/>
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