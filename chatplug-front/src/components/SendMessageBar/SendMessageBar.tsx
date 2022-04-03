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
        placeholder="Ecris un message..."
        className="flex-1 w-72 p-2 rounded-lg focus:outline-none focus:placeholder-white-200 text-charcoal
        placeholder-charcoal bg-white border focus:ring-1 focus:ring-blossom"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter' && sendMessage(event)}
      />
      <button
          type="button"
          className="rounded-lg h-12 w-16 mx-2
            transition duration-500 ease-in-out text-charcoal hover:bg-latte
            focus:outline-none border border-charcoal"
          onClick={(event) => sendMessage(event)}
          >
            Send
      </button>
    </div>
  )
}

export default SendMessageBar;