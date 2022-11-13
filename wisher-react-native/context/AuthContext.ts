import { createContext } from "react"

type AuthContextType = {
    isLoggedIn: boolean,
    setLoggedIn: any
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setLoggedIn: null
})

export const AuthProvider = AuthContext.Provider
