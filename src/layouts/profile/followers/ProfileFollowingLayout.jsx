
import { ProfilePageStore } from "../../../components/profile/ProfilePage"
import useMethods from "../../../methods"
import FollowLayout from "./FollowLayout"


function ProfileFollowingLayout() {
    const following = ProfilePageStore(state => state.following)
    const { block, unFollow } = useMethods()
    const options = [unFollow, block]

    return <FollowLayout follow={following} options={options} label='following' />
}

export default ProfileFollowingLayout
