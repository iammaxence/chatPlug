import React from "react";

type Props = {
  message: string, 
  setMessage: (arg: string) => void,
  sendMessage: (arg: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const SendMessageBar = ({message, setMessage, sendMessage}: Props) => {
  return (
    <div 
      className="flex w-full p-4 bottom-0 fixed"
    >
      <input 
        type="text" 
        placeholder="Write a message..."
        className="flex-1 w-72 p-2 rounded-lg focus:outline-none focus:placeholder-white-200 text-white
        placeholder-gray-600 bg-gray-900"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter' && sendMessage(event)}
      />
      <button
          type="button"
          className="rounded-lg h-12 w-16 mx-2
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