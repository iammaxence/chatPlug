import { User } from '../domain/User';
import defaultLogo from '../../assets/animeguy.jpg';

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
        <div className="flex items-start mx-2 py-4 space-x-3 " >
          <img className= "self-end h-12 w-12 border-2 rounded-sm border-white" src={defaultLogo} alt="pic" />
          <div className="flex p-2 rounded-lg rounded-bl-none bg-forest-light  text-black" >
            <div className='mx-2'>
              <div className='flex relative -top-0.5 space-x-6'>
                <p className="font-semibold">
                  { user.getPseudo() }
                </p>
                <p>vendredi 9 avril 12:32</p>
              </div>
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