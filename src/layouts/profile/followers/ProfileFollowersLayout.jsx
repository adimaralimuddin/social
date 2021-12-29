import useMethods from "../../../methods"
import { profileState } from "../../../state/userState"
import FollowLayout from "./FollowLayout";


function ProfileFollowersLayout() {
    const followers = profileState(state => state.followers)
    const { block, unFollow } = useMethods();
    const options = [unFollow, block]

    return <FollowLayout follow={followers} options={options} label='followers' />
}

export default ProfileFollowersLayout
