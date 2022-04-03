import { Link, useHistory } from 'react-router-dom';
import { useState } from "react";

const SearchBar = () => {
  const [roomName, setRoomName] = useState('');
  const history = useHistory();

  const handleKeypress = (event: any) => {
      if(roomName && event.key === 'Enter') 
        history.push(`/chat/${roomName}`);
  }

    return (
        <div className="my-16 space-x-4">
          <input 
            className="w-72 h-9 rounded-lg shadow-md border border-black-500
            focus:outline-none focus:ring-2 focus:ring-blossom"
            type='text' placeholder="Ecris le nom d'un salon pour y accéder"
            onChange={(event) => setRoomName(event.target.value) }
            onKeyPress={(event) => handleKeypress(event)}
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
        </div>
    );
}

export default SearchBar;