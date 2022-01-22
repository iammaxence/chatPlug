import { User } from "../components/domain/User";


const userState = {
    user: User||null,
}

const userReducer = (state = userState, action: any) => {
    if( action.type instanceof User) {
        userState.user = action.type;
        return {
            ...state,
            user: userState.user
        };
    }
    return state;
}

export default userReducer;
