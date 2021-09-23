import { AUTH_USER, LOGOUT_USER, REGISTER_USER } from "../actions/types";

const initialState = {
     
}

const authReducer = ( state=initialState, action ) => {
    switch (action.type) {
        case AUTH_USER:
        case REGISTER_USER:
            return{
                ...state,
                userInfo: action.payload,
                loading: false
                
            }
        case LOGOUT_USER:
            return{
                ...state,
                userInfo: null,
                loading:false
            }
        default:
            return state;
    }
}

export default authReducer