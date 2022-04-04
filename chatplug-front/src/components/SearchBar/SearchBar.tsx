import { Link, useHistory } from 'react-router-dom';
import { useState } from "react";

type Props = {
  setValue: any;
  eventKeyPress: any;
  placeholder: string;
  className: string;
}

const SearchBar = ({ className, setValue, eventKeyPress, placeholder }: Props) => {

  return (
      <div className={className}>
        <input 
          className="pl-2 w-72 h-9 rounded-lg shadow-md border border-black-500
          focus:outline-none focus:ring-2 focus:ring-blossom"
          type='text' placeholder={placeholder}
          onChange={(event) => setValue(event.target.value) }
          onKeyPress={(event) => eventKeyPress(event)}
        />
      </div>
  );
}

export default SearchBar;