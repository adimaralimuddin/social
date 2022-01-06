import { profileState } from "../../state/userState";
import useAuth from "../../firebase/auth"

function UserProfileInfoPop({ open, onClose }) {

    const { logout } = useAuth();
    const profile = profileState(state => state.profile)


    function onLogout() {
        logout()
        onClose()
    }


    if (open) {

        return (
            <div
                onMouseLeave={onClose}
                className="absolute t0 r10 mxh350 pt70 pr20 mnw100">
                <div className="absolute r0 mnw300 shadow1 b w100per   flxC white br10 p20 front2">
                    <header className="flx wrap itemCenter relative mb20">
                        <img src={profile?.AvatarImage} alt="profile image" className="mxh100 mxw100 mnw100 mnh100 br90per shadow1" />
                        <span className="mlr10">
                            <h3 className="mlr10">{profile?.fullName}</h3>
                            <button className="b1s trans cdark shadow0 hov-dark8">view profile</button>
                        </span>
                    </header>
                    <button onClick={onLogout} className="relative">logout</button>
                </div>
            </div>
        )
    } else return null
}

export default UserProfileInfoPop
