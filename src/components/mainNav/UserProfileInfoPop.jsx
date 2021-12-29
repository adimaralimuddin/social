import { useState } from "react";
import { userState } from "../../state/userState";
import useAuth from "../../firebase/auth"
import Avatars from "../others/Avatars";

function UserProfileInfoPop({ open, onClose }) {

    const { logout } = useAuth();
    const user = userState(state => state.user)

    function onLogout() {
        logout()
        onClose()
    }

    function toProfile() {
        onClose()

    }

    if (open) {

        return (
            <div onMouseLeave={onClose} className="fixed t70 r10 flxC b white shadow1 p20 br mnw200 mnh200 mxw250">
                <header>
                    <Avatars />
                    <h3>{user?.email}</h3>
                </header>
                <button onClick={onLogout}>logout</button>
                <button onClick={toProfile}>profile</button>
            </div>
        )
    } else return null
}

export default UserProfileInfoPop
