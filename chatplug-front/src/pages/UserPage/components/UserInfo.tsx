import { useSelector } from "react-redux";
import defaultLogo from "../../../assets/animeguy.jpg";
import configLogo from "../../../assets/settings.png";

const UserInfo = () => {
    const { user } = useSelector((state: any) => (state));
    return (
        <div className= "flex items-center my-4 justify-between">
            <div className="flex items-center space-x-4">
                <img className= "h-12 w-12 border-2 rounded-lg" src={defaultLogo} alt="pic" />
                <span>{user.pseudo}</span>
            </div>
            <img className= "h-5 w-5 rounded-lg" src={configLogo} alt="pic" />
        </div>
    )
}
export default UserInfo