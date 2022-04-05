import { useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import ChatListOverview from "./components/ChatOverview";
import UserInfo from "./components/UserInfo";

const UserPage = () => {
    const [searchValue, setSearchValue] = useState('');

    const chatList = [
        {
            id: 1,
            name: 'lesboss',
            description: 'Un channel qui regroupe que les boss'
        },
        {
            id: 2,
            name: 'lafrance',
            description: 'Un channel qui regroupe une communauté francophone'
        },
    ]

    return (
        <div className="flex h-full">
           <div className="container px-4 w-96 border-r-2 border-charcoal">
            <UserInfo />
            <SearchBar
                className="text-center"
                setValue={searchValue}
                eventKeyPress={() => ''}
                placeholder="Recherche..."
            />
            <div className="py-6">
                <span>Mes chats</span>
                <ChatListOverview 
                    chatList = {chatList}
                />
            </div>
            <div>
                <span>Historique des chats</span>
                <ChatListOverview 
                    chatList = {chatList}
                />
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