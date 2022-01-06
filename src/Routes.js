
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { profileState, userState } from './state/userState'
import Home from './layouts/Home'
import FeedsLayout from './layouts/FeedsLayout'
import ProfileLayout from './layouts/profile/ProfileLayout'
import MyProfile from './components/profile/MyProfile'

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
    const login = profileState(state => state.isLogin)

    const routers = [
        newRoute('/', <Home />, !login),
        newRoute('/', <FeedsLayout />, login),
        newRoute('/feeds', <FeedsLayout />, login, '/'),
        newRoute('profile/*', <ProfileLayout />, login, '/'),
        newRoute('myprofile/*', <MyProfile />, login, '/'),
    ]

    return {
        routers
    }
}


function newRoute(path, element, condition = true, redirect) {
    return {
        redirect: redirect,
        name: path == '/' ? 'home' : path.replace('/', ''),
        path,
        element,
        condition,
    }
}

export function dynRoute(route) {
    if (route.condition) {
        return <Route exact key={route.name} {...route} />
    }
    // return null
    return <Route exact key={route.name} path={route?.name || '/*'} element={<Navigate replace to={route?.redirect || '/'} />} />

}

export function DynLink({ router, children }) {
    if (router.condition) {
        return <Link className='ml10' to={router.path}>{children}</Link>
    } else {
        return null
    }
}