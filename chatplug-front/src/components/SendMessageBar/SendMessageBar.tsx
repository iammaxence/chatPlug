import React from "react";

type Props = {
  message: string, 
  setMessage: (arg: string) => void,
  sendMessage: (arg: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const SendMessageBar = ({message, setMessage, sendMessage}: Props) => {
  return (
    <div 
      className="flex w-full pl-4 bottom-0 fixed bg-gray-900 rounded-full"
    >
      <input 
        type="text" 
        placeholder="Write a message..."
        className="flex-1 rounded-full focus:outline-none focus:placeholder-white-200 text-white
        placeholder-gray-600 bg-gray-900"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter' && sendMessage(event)}
      />
      <button
          type="button"
          className="rounded-full h-12 w-16
            transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400
            focus:outline-none border border-blue-500"
          onClick={(event) => sendMessage(event)}
          >
            Send
      </button>
    </div>
  )
}

export default SendMessageBar;