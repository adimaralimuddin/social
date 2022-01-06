
import { ProfilePageStore } from "../../../components/profile/ProfilePage"
import useMethods from "../../../methods"
import FollowLayout from "./FollowLayout"


function ProfileFriendsLayout() {
    const friends = ProfilePageStore(state => state.friends)
    const { block, unFriend } = useMethods()
    const options = [unFriend, block]

    return <FollowLayout follow={friends} options={options} label={'friends'} />
}

export default ProfileFriendsLayout