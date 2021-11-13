import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"
const INITIAL_STATE={
    user:{"_id":"6182965b7ff9da896613850c","username":"jayraj","email":"jay@gmail.com","password":"$2b$10$EHSwgf63JYg9WdtFlaXK5unpbMfaEbDW/xxKwEZAW.d6Xydta8EFO","profilePicture":"","coverPicture":"","followers":[],"followings":["618292736f32b07420ec52e1","618928c640178105141183af"],"createdAt":{"$date":{"$numberLong":"1635948123048"}},"updatedAt":{"$date":{"$numberLong":"1636467267039"}},"__v":{"$numberInt":"0"}},
    isFetcthing:false,
    error:false
}

export const AuthContext=createContext(INITIAL_STATE)

export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE)
    return (
        <AuthContext.Provider value={{user:state.user,isFetcthing:state.isFetcthing,error:state.error,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}