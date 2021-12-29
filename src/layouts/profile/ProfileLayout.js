import { Route, Routes } from "react-router-dom"
import UpdateProfileLayout from "../../components/profile/UpdateProfileLayout"
import Profile from "../Profile"


function ProfileLayout() {
    return (
        <div>
            <Routes>
                <Route path='*' element={<Profile />} />
                <Route path='update' element={<UpdateProfileLayout />} />
            </Routes>
        </div>
    )
}

export default ProfileLayout
