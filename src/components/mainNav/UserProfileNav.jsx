import { useState } from "react"
import { profileState, userState } from "../../state/userState"
import Avatars from "../others/Avatars"
import UserProfileInfoPop from "./UserProfileInfoPop"

function UserProfileNav() {
    const user = userState(state => state.user)
    const profile = profileState(state => state.profile)
    const [open, setOpen] = useState(false)

    function toggle() {
        setOpen(true)
    }
    function onCloseHandler() {
        setOpen(false)
    }

    return (
        <div onMouseEnter={toggle} className="mlr10 flx itemCenter">
            <Avatars url={profile?.photoUrl} />
            <span className="material-icons">
                expand_more
            </span>
            <UserProfileInfoPop onClose={onCloseHandler} open={open} />
        </div>
    )
}

export default UserProfileNav
