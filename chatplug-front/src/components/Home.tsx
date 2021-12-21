import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  const [roomName, setRoomName] = useState('');

  return (
    <div> 
      <div className="flex flex-col justify-center items-center mt-24 ">
        <span
          className="font-home text-5xl"
        >
          ChatPlug
        </span>
        <div className="my-16 space-x-2">
          <input className="border border-red-500" type='text' placeholder='roomName' onChange={(event) => setRoomName(event.target.value) } />
          <Link onClick={ event => (!roomName) && event.preventDefault() } to={{pathname: '/chat', state: { data: {roomName}}}}>
            <button type="submit">Let's go</button>
          </Link>
        </div>
        {/* <input type='text' placeholder='roomId' onChange={(event) => setRoomId(+event.target.value) } />
        <input type='text' placeholder='roomName' onChange={(event) => setRoomName(event.target.value) } />
        <Link onClick={ event => (!roomId) ? event.preventDefault() : null } to={{pathname: '/chat', state: { data: {room: {id: roomId, name: roomName}}}}}>
          <button type="submit">Let's go</button>
        </Link> */}
      </div>
    </div>
  )
}

export default Home;