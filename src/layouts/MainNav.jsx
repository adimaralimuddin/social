
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import DynamicNavLinks from '../components/mainNav/DynamicNavLinks'
import MainNavSearchBar from '../components/mainNav/MainNavSearchBar'
import UserProfileNav from '../components/mainNav/UserProfileNav'
import { userState } from '../state/userState'
function MainNav() {

    const user = userState(state => state.user)
    return (
        <div className='fixed t0 l0 bb shadow1 white plr20 p10 flxBetween itemCenter w100per'>
            <Logo />
            <MainNavSearchBar />
            <nav className='flx itemCenter'>
                {
                    user && (
                        <ul>
                            <Link to='feeds'>
                                <span className="material-icons hov-enlarge">home</span>
                            </Link>
                            <Link to='feeds'>
                                <span className="material-icons hov-enlarge">chat_bubble</span>
                            </Link>
                        </ul>

                    )
                }
                <UserProfileNav />
            </nav>
        </div>
    )
}

export default MainNav

