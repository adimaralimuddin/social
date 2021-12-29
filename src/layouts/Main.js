import { useEffect } from "react";
import useAuth from "../firebase/auth"
// import useAppRoutes from "../Routes";
import AppRoutes from "../Routes"
import MainNav from "./MainNav"

function Main() {
    const { listen } = useAuth();
    // const { AppRoutes } = useAppRoutes();

    useEffect(() => {
        listen()

        return () => {

        }
    }, [])
    return (
        <div>
            <MainNav />
            <div>
                <AppRoutes />
            </div>
        </div>
    )
}

export default Main
