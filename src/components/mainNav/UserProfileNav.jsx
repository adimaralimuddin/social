import { useState } from "react"
import { Link } from "react-router-dom"
import useProfile from "../../firebase/useProfile"
import { profileState, selectedProfileUidState, userState } from "../../state/userState"
import Avatars from "../others/Avatars"
import UserProfileInfoPop from "./UserProfileInfoPop"

function UserProfileNav() {
    const user = userState(state => state.user)
    const profile = profileState(state => state.profile)
    const [open, setOpen] = useState(false)
    const { initSelectedProfile } = useProfile();
    const set = selectedProfileUidState(state => state.set)

    function toggle() {
        setOpen(true)
    }
    function onCloseHandler() {
        setOpen(false)
    }

    if (user) {
        return (
            <Link to='myprofile' onMouseEnter={toggle} className="mlr10 flx itemCenter">
                <Avatars url={profile?.AvatarImage} />
                <span className="material-icons">
                    expand_more
                </span>

                <UserProfileInfoPop onClose={onCloseHandler} open={open} />

            </Link>
        )
    }
    return null
}

export default UserProfileNav
