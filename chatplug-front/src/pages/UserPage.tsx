import { useState } from "react";
import { useSelector } from "react-redux";
import defaultLogo from "../assets/animeguy.jpg";
import configLogo from "../assets/settings.png";
import SearchBar from "../components/SearchBar/SearchBar";

const UserPage = () => {
    const { user } = useSelector((state: any) => (state));

    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="flex h-full">
           <div className="container px-4 w-96 border-r-2 border-charcoal">
            <div className= "flex items-center my-4 justify-between">
                <div className="flex items-center space-x-4">
                    <img className= "h-12 w-12 border-2 rounded-lg" src={defaultLogo} alt="pic" />
                    <span>{user.pseudo}</span>
                </div>
                <img className= "h-5 w-5 rounded-lg" src={configLogo} alt="pic" />
            </div>
            <SearchBar
                className="text-center"
                setValue={searchValue}
                eventKeyPress={() => ''}
                placeholder="Recherche..."
            />
            <div className="py-6">
                <span>Mes chats en favoris</span>
            </div>
            <div className="py-6" >
                <span>Mes chats</span>
            </div>
           </div>
           <div className="flex-1 border-r-2 border-charcoal">
               chat
           </div>
           <div className="w-96">
               Other infos
           </div>
        </div>
    )
}

export default UserPage;