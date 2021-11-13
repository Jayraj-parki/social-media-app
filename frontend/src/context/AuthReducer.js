
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetcthing: true,
                error: false
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetcthing: false,
                error: false
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetcthing: false,
                error: action.payload
            }
        default:
            return state
    }
}
export default AuthReducer