import React, { useState, useEffect } from "react";
import io, { Socket } from 'socket.io-client';
import { User } from "../domain/user/User";
import Messages from "../Messages/Messages";
import RoomInfo from '../Room/RoomInfo';
import SendMessageBar from "../SendMessageBar/SendMessageBar";
import { useSelector } from "react-redux";
import allServices from "../../services";
import { Room } from "../domain/user/Room";

const { roomService , messageService } = allServices;

const { getAllMessagesFromRoom } = messageService;

type Props = {
  match: any;
}

type TypeMessage = {
  user: User;
  text: string;
  date: string;
}

let socket: Socket;

const Chat = ({ match }: Props) => {
  
  const { user } = useSelector((state: any) => (state));

  const [room, setRoom] = useState<Room>();
  const [nbconnectedUsers, setConnectedUsers] = useState<number>(0)
  const [message, setMessage] =useState('');
  const [messages, setMessages] = useState<TypeMessage[]>([]);

  const ENDPOINT='http://localhost:8090';

  useEffect(() => {
    // Get or create Room
    async function getRoom (roomName: string) {
      let room = await roomService.getRoomByName(roomName);

      if(!room) {
        room = await roomService.createRoom(roomName);
      }
      setRoom(room);
    }
    const roomName = match.params.roomName
    if(roomName) {
      getRoom(roomName);
    }
  },[match.params])

  useEffect(() => {
   
    if(user && room) {
      // Get all the messages from a room
      socket = io(ENDPOINT);

      getAllMessagesFromRoom(room.getId()).then((allMessages: any) => setMessages(allMessages));
      socket.emit('join', {id: user.getId(), room});
    
      // console.log('EXECUTE 1 FOIS');
      return () => {
        //socket.disconnect();
        socket.off();
      }
    }

  },[ENDPOINT, user, room])

  useEffect(() => { 
    if(user && room) {
      socket.once('message', ({user, messageToSend}) => {
        const {id, pseudo, status} = user;
        const userEmitter = new User(id, pseudo, status); 
        const { text, date } = messageToSend;
      
        const newMessage = {user: userEmitter, text, date};
        console.log('NEW MESSAGE : ', newMessage);
        setMessages([...messages, newMessage])
      })
    }
  }, [messages, user, room])

  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if(user && message) {
      const userId: number = user.getId();
      socket.emit('sendMessage', {userId, message, room}, () => { setMessage('')})
    }
  }

  console.log('CHAT :', message, messages);

  if(user && room) {
    return (
      <div className="flex flex-col justify-between h-screen">
        <section className="flex flex-col fixed w-full">
          <RoomInfo room={room} nbconnectedUsers={nbconnectedUsers}/>
        </section>
        <section className="flex flex-col-reverse mt-24 overflow-auto">
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