import * as actionTypes from '../actions'

const initialState = {
    user_data : []
}

const UserReducerV2  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            return {
                ...state,
                user_data: action.user_data
            }
        default:
            break;
    }
    return state;
}
export default UserReducerV2