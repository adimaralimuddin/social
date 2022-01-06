
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { profileState, userState } from "../state/userState";
import { auth, db } from "./firebaseConfig"
import useProfile from "./useProfile";

const useAuth = () => {

    const navigate = useNavigate()
    const setIsLogin = profileState(state => state.setIsLogin)

    const setUserContext = userState(state => state.setUser)
    const { init } = useProfile();

    function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(({ user }) => {
                setUserContext(user)
                init(user)
            })
    }

    function loginWithEmailAndPassword(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                init(user)
                setUserContext(user)
            })
    }

    function logout() {
        signOut(auth).then(user => {
            setUserContext(user)
            navigate('/')
        })
    }

    function listen() {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUserContext(user)
                init(user)
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        })
    }

    const value = {
        loginWithGoogle,
        loginWithEmailAndPassword,
        logout,
        listen
    }
    return value
}

export default useAuth