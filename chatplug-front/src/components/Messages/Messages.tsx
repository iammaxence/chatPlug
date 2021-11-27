import React, { useEffect }  from "react";
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

  const scrollToBottom = () => {
    document.getElementById('scrollToBottom')!.scrollIntoView({ behavior: "auto" })
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="overflow-auto mb-14">
      {
        messages.map((message, index) =>
        <div key={index}>
          <Message message={ message } currentUser={ user }/>
        </div>)
      }
       <div id="scrollToBottom" />
    </div>
  )
}

export default Messages;