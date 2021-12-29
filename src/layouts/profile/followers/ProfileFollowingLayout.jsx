
import useMethods from "../../../methods"
import { profileState } from "../../../state/userState"
import FollowLayout from "./FollowLayout"


function ProfileFollowingLayout() {
    const following = profileState(state => state.following)
    const { block, unFollow } = useMethods()
    const options = [unFollow, block]

    return <FollowLayout follow={following} options={options} label='following' />
}

export default ProfileFollowingLayout
