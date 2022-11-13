import { LOGIN, LOGOUT, SIGNUP, UPDATE_PROFILE } from "../actions/authActions"

const initialState = null

export default (state = initialState, action: any) => {
    const { type, payload } = action

    switch (type) {
        case LOGIN:
        case SIGNUP:
        case UPDATE_PROFILE:
            return payload
        case LOGOUT:
            return initialState
        default:
            return state
    }
}