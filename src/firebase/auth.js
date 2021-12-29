
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { profileState, userState } from "../state/userState";
import { auth, db } from "./firebaseConfig"
import useProfile from "./useProfile";

const useAuth = () => {

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
        signOut(auth).then(user => setUserContext(user))
    }

    function listen() {
        onAuthStateChanged(auth, user => {
            setUserContext(user)
            init(user)
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