import { useEffect } from "react";
import useAuth from "../firebase/auth"
// import useAppRoutes from "../Routes";
import AppRoutes from "../Routes"
import { profileState } from "../state/userState";
import MainNav from "./MainNav"

function Main() {
    const { listen } = useAuth();
    const isLogin = profileState(s => s.isLogin)
    // const { AppRoutes } = useAppRoutes();

    useEffect(() => {
        listen()
        return () => {
        }
    }, [])
    return (
        <div className="flxC flx1">
            <MainNav />
            {/* <div> */}
            <span className='p40'></span>

            {
                // isLogin &&
                <AppRoutes />
            }
            {
                // !isLogin && <button>login</button>
            }
            {/* </div> */}
        </div>
    )
}

export default Main
