import SearchBar from "../components/SearchBar/SearchBar";
import { Link, useHistory } from 'react-router-dom';
import { useState } from "react";

const HomePage = () => {
  const title = "ChatPlug";

  const [roomName, setRoomName] = useState('');
  const history = useHistory();

  const handleKeypress = (event: any) => {
      if(roomName && event.key === 'Enter') 
        history.push(`/chat/${roomName}`);
  }

  return (
    <div className="flex flex-col items-center w-full">
        <span
          className="font-home text-forest text-5xl mt-24"
        >
          { title }
        </span>
        <SearchBar
          className="my-16 space-x-4"
          setValue = {setRoomName}
          eventKeyPress= {handleKeypress}
          placeholder="Ecris le nom d'un salon pour y accéder"
        />
        <Link
          onClick={ event => (!roomName) && event.preventDefault() }
          to={{pathname: `/chat/${roomName}`}}>
          <button
            className="w-12 h-9 shadow-md rounded-lg border border-black-500 bg-white text-forest"
            type="submit"
          >
            Go
          </button>
        </Link>
        <div
          className="text-forest"
        >
          In progress
        </div>
    </div>
  )
}

export default HomePage;