
import { Link, Route, Routes } from 'react-router-dom'
import { userState } from './state/userState'
import Feeds from './layouts/Feeds'
import Home from './layouts/Home'
import Profile from './layouts/Profile'
import FeedsLayout from './layouts/FeedsLayout'
import ProfileLayout from './layouts/profile/ProfileLayout'

export default function useAppRoutes() {

    const { routers } = useAppRouters()


    function popRoutes() {
        return routers.map(route => {
            return dynRoute(route)
        })
    }

    return (
        <Routes>
            {popRoutes()}
        </Routes>
    )


}


export const useAppRouters = () => {
    const user = userState(state => state.user)

    const routers = [
        newRoute('/', <Home />, !user),
        newRoute('/feeds', <FeedsLayout />, user),
        newRoute('profile/*', <ProfileLayout />, user),
    ]

    return {
        routers
    }
}


function newRoute(path, element, condition = true) {

    return {
        name: path == '/' ? 'home' : path.replace('/', ''),
        path, element,
        condition
    }
}

export function dynRoute(route) {
    if (route.condition) {
        return <Route key={route.name} {...route} />
    }
}

export function DynLink({ router, children }) {
    if (router.condition) {
        return <Link className='ml10' to={router.path}>{children}</Link>
    } else {
        return null
    }
}