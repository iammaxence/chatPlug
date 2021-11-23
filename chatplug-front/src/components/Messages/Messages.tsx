import React from "react";
import { User } from "../domain/user/User";
import Message from './Message'


type TypeMessage = {
  user: User;
  text: string;
}

type Props = {
  messages: TypeMessage[],
  user: User,
}

const Messages = ({ messages, user }: Props) => {
  return (
    <div className="overflow-auto mb-14">
      { messages.map((message, index) =>
      <div key={index}>
        <Message message={ message } currentUser={ user }/>
      </div>) }
    </div>
  )
}

export default Messages;