import * as actionTypes from '../actions'

const initialState = {
   access_token : {}
}

const TokenReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            console.log("checking wtf",{
                ...state,
                access_token: action.access_token
            } )
            return {
                ...state,
                access_token: action.access_token
            }
        default:
            break;
    }
    return state;
}

export default TokenReducer
