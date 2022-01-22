import { User } from '../domain/User';
import defaultLogo from '../../assets/prise.jpeg';

type TypeMessage = {
  user: User;
  text: string;
}

type Props = {
  message: TypeMessage,
  currentUser: User,
}

const Message = ({message: {user, text}, currentUser}: Props) => {

  const isSendByCurrentUser = () => {
      return (
        <div className="flex items-start mx-2 mb-4" >
          <div className="flex p-2 rounded-lg rounded-bl-none bg-gray-300 text-black" >
            <img className= "h-12 w-12 border-2 border-white" src={defaultLogo} alt="pic" />
            <div className='mx-2'>
              <p className="relative -top-0.5 font-semibold">
                { user.getPseudo() }
              </p>
              <p> { text } </p>
            </div>
          </div>
        </div>
      )
  }

 return (
   <div>
      { isSendByCurrentUser() }
   </div>
 )
}

export default Message;