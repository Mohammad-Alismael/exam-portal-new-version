import * as actionTypes from '../actions'

const initialState = {
    user_id: 0,
    role_id: 0,
    username : ""
}
const UserReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_ID:
            return {
                ...state,
                user_id: action.payload.user_id
            }
        case actionTypes.SET_USERNAME:
            return {
                ...state,
                username: action.payload.username
            }
        case actionTypes.SET_ROLE_ID:
            return {
                ...state,
                role_id: action.payload.role_id
            }
        default:
            break;
    }
    return state;
}

export default UserReducer