
import useMethods from "../../../methods"
import { profileState } from "../../../state/userState"
import FollowLayout from "./FollowLayout"


function ProfileFriendsLayout() {
    const friends = profileState(state => state.friends)
    const { block, unFriend } = useMethods()
    const options = [unFriend, block]

    return <FollowLayout follow={friends} options={options} label={'friends'} />
}

export default ProfileFriendsLayout