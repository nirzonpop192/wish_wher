import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const useAuth = () => {
    const authContext = useContext(AuthContext)
    const { isLoggedIn, setLoggedIn } = authContext
    return {
        isLoggedIn,
        setLoggedIn
    }
}

export default useAuth
