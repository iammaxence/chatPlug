import React from 'react';

type Props = {
  room: {id: number, name: string},
  nbconnectedUsers: number,
}

const RoomInfo = ({room, nbconnectedUsers}: Props) => {

  return (
    <div className="flex flex-col p-2 bg-gray-500">
      <div className="text-2xl flex items-center">
        <span className="mr-3">{room.name }</span>
        <span className="text-green-500">
            <svg width="10" height="10">
              <circle cx="5" cy="5" r="5" fill="currentColor"></circle>
            </svg>
        </span>
      </div>
      <span className="text-sm">{ nbconnectedUsers } people online</span>
    </div>
  )
}

export default RoomInfo