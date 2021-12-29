
import Logo from '../components/Logo'
import DynamicNavLinks from '../components/mainNav/DynamicNavLinks'
import MainNavSearchBar from '../components/mainNav/MainNavSearchBar'
import UserProfileNav from '../components/mainNav/UserProfileNav'
function MainNav() {


    return (
        <div className='bb shadow1 white plr20 p10 flxBetween itemCenter'>
            <Logo />
            <MainNavSearchBar />
            <nav className='flx itemCenter'>
                <DynamicNavLinks />
                <UserProfileNav />
            </nav>
        </div>
    )
}

export default MainNav

