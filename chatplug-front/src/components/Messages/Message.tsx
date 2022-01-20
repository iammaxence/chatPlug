import { User } from '../domain/User';

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
        <div className="flex items-start mx-2 my-4" >
          <div className="flex p-2 rounded-lg rounded-bl-none bg-gray-300 text-black" >
            <div className= "h-12 w-12 border-2 border-white">
              picture
            </div>
            <div className='mx-2'>
              <p className="relative -top-1.5"> { user.getPseudo() } </p>
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