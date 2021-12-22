import React from 'react';
import { User } from '../domain/user/User';

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
    if(user.getId() === currentUser.getId()) {
      return (
        <div className="flex flex-col items-end mx-2" >
        <div>
          <p> { user.getPseudo() } </p>
        </div>
        <div className="flex flex-col p-2 rounded-lg rounded-br-none bg-blue-300 text-black" >
          <p> { text } </p>
        </div>
      </div>
      );
    }
    else if (user.getPseudo() === 'admin') {
      return (
        <div className="flex flex-col items-center w-full bg-gray-600 ">
          <p className=""> { text } </p>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-start mx-2" >
          <div>
            <p> { user.getPseudo() } </p>
          </div>
          <div className="flex flex-col p-2 rounded-lg rounded-bl-none bg-gray-300 text-black" >
            <p> { text } </p>
          </div>
        </div>
      )
    }
  }

 return (
   <div>
      { isSendByCurrentUser() }
   </div>
 )
}

export default Message;