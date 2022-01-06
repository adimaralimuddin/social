
import ProfileAboutLayout from './ProfileAboutLayout'
import { ProfilePageStore } from '../../../components/profile/ProfilePage'
import PostsListsLayout from '../../../views/PostsListsLayout'

function ProfileTimelineLayout() {

    const user = ProfilePageStore(state => state.selectedUser)
    const posts = ProfilePageStore(state => state.posts)

    return (
        <div className='flxBetween wrap mlr10'>
            <div className='flx1 flxC mlr10 mt10 mnw200 '>
                <ProfileAboutLayout user={user} />
            </div>
            <div className=' flx2 mlr10 mt10 mnw300 '>
                <PostsListsLayout data={posts}/>
            </div>
        </div>
    )
}

export default ProfileTimelineLayout
