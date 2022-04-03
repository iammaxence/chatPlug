import { Link, useHistory } from 'react-router-dom';
import { Room } from '../domain/Room';
import backLogo from '../../assets/back.png';


type Props = {
  room: Room,
  nbconnectedUsers: number,
}

const RoomInfo = ({room, nbconnectedUsers}: Props) => {
  const history = useHistory();

  const goToHomePage = () => {
    history.push(`/`);
  }
  
  return (
    <div className="flex justify-between p-2 border-b-2 border-charcoal bg-latte">
      <div className="flex flex-col">
        <span className="mr-3 text-forest text-2xl">{room.getName() }</span>
        <span className="text-sm">{ nbconnectedUsers } people online</span>
      </div>
      <button
        className='mx-6'
        onClick={goToHomePage}
      >
        <img className= "h-8 w-8" src={backLogo} alt="pic" />
      </button>
    </div>
  )
}

export default RoomInfo