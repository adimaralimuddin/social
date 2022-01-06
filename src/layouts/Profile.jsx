import { Route, Routes } from "react-router-dom"
import ProfilePage from "../components/profile/ProfilePage"
import UserProfileHeader from "../components/profile/UserProfileHeader"
import ProfileFollowersLayout from "./profile/followers/ProfileFollowersLayout"
import ProfileFollowingLayout from "./profile/followers/ProfileFollowingLayout"
import ProfileFriendsLayout from "./profile/followers/ProfileFriendsLayout"
import ProfileTimelineLayout from "./profile/timeline/ProfileTimelineLayout"

function Profile() {
    return (
        <div className="flxC itemCenter h100vh">
            <div className="w100per flxC mxw900">
                {/* <UserProfileHeader /> */}

                <ProfilePage />
                <div>
                    <Routes>
                        <Route path='*' element={<ProfileTimelineLayout />} />
                        <Route path='timeline' element={<ProfileTimelineLayout />} />
                        <Route path='followers' element={<ProfileFollowersLayout />} />
                        <Route path='following' element={<ProfileFollowingLayout />} />
                        <Route path='friends' element={<ProfileFriendsLayout />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Profile

