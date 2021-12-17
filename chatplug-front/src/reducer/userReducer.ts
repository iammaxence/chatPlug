import { User } from "../components/domain/user/User";


const states = {
    user: User||null,
}

const userReducer = (state = states, action: any) => {
    states.user = action.type;
    return state;
}

export default userReducer;
