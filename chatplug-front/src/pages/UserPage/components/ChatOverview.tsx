import defaultLogo from "../../../assets/read-more.png";

type Props = {
    chatList: Array<any>;
}

const ChatListOverview = ({ chatList }: Props) => {

    const handleOnClick = (chatName: string) => {
        console.log('Click on : ', chatName)
    }

    const renderChatList = chatList.map(chat => {
        return (
            <div 
                className="flex py-2 my-4 border rounded-lg hover:bg-forest-light cursor-pointer"
                onClick={() => handleOnClick(chat.name)}
            >
                <img className= "mx-2 h-12 w-12 rounded-lg" src={defaultLogo} alt="pic" />
                <div className="mx-4">
                    <span>{chat.name}</span>
                    <p>{chat.description}</p>
                </div>
            </div>
        );
    });
    
    return (
       <div>
           {renderChatList}
       </div>
    )
}
export default ChatListOverview;