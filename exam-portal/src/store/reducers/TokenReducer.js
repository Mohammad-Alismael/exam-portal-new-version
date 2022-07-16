import * as actionTypes from '../actions'
import jwt from "jwt-decode";

const initialState = {
   access_token : {},
    isExpired: null
}

const TokenReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            return {
                ...state,
                isExpired: true,
                access_token: action.access_token
            }
        case actionTypes.isExpired:
            const user_data = jwt(state.access_token['accessToken'])
            const current_time = new Date().getTime() / 1000;
            return {
                ...state,
                isExpired: current_time < user_data['exp']
            }
        default:
            break;
    }
    return state;
}

export default TokenReducer
