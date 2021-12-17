import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  const [roomId, setRoomId] = useState(0);
  const [roomName, setRoomName] = useState('');
 
  return (
    <div> 
      <div>
        <input type='text' placeholder='roomId' onChange={(event) => setRoomId(+event.target.value) } />
        <input type='text' placeholder='roomName' onChange={(event) => setRoomName(event.target.value) } />
        <Link onClick={ event => (!roomId) ? event.preventDefault() : null } to={{pathname: '/chat', state: { data: {room: {id: roomId, name: roomName}}}}}>
          <button type="submit">Let's go</button>
        </Link>
      </div>
    </div>
  )
}

export default Home;