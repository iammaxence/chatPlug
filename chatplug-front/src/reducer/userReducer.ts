import { User } from "../components/domain/user/User";


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
    console.log('state user : ', state);

    return state;
}

export default userReducer;
