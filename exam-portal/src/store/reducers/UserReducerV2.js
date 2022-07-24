import * as actionTypes from '../actions'
import jwt from "jwt-decode";

const initialState = {
    user: null
}

const UserReducerV2  = (state = initialState, action) => {
    console.log('userReducer', action.user)
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            break;
    }
    return state;
}
export default UserReducerV2