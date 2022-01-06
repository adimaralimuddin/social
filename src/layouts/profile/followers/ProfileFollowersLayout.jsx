import { ProfilePageStore } from "../../../components/profile/ProfilePage";
import useMethods from "../../../methods"
import FollowLayout from "./FollowLayout";


function ProfileFollowersLayout() {
    const followers = ProfilePageStore(s => s.followers)
    const { block, unFollow } = useMethods();
    const options = [unFollow, block]

    return <FollowLayout follow={followers} options={options} label='followers' />
}

export default ProfileFollowersLayout
