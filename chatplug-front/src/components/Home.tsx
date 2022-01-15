import { useState } from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const title = "ChatPlug";

  return (
    <div> 
      <div className="flex flex-col justify-center items-center mt-24 ">
        <span
          className="font-home text-5xl"
        >
          { title }
        </span>
        <div className="my-16 space-x-6">
          <input 
            className="w-72 h-9 rounded-lg shadow-md border border-black-500
            focus:outline-none focus:ring-2 focus:ring-blue-300"
            type='text' placeholder="Ecris le nom d'un salon pour y accéder"
            onChange={(event) => setRoomName(event.target.value) }
          />
          <Link
            onClick={ event => (!roomName) && event.preventDefault() }
            to={{pathname: `/chat/${roomName}`, state: { data: {roomName}}}}>
            <button type="submit">Let's go</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home;