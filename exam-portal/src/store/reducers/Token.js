import * as actionTypes from '../actions'

const initialState = {
   access_token : {}
}

const Token  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            return {
                ...state,
                access_token: action.access_token
            }
        default:
            break;
    }
    return state;
}

export default Token
