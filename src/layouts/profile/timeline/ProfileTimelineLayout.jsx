
import ProfileAboutLayout from './ProfileAboutLayout'
import Feeds from '../../Feeds'
import { profileState } from "../../../state/userState"

function ProfileTimelineLayout() {


    const posts = profileState(state => state.posts)

    return (
        <div className='flxBetween wrap mlr10'>
            <div className='flx1 flxC mlr10 mt10 mnw200 '>
                <ProfileAboutLayout />
            </div>
            {/* <div className='p10 red'></div> */}
            <div className=' flx2 mlr10 mt10 mnw300 '>
                <Feeds data={posts} />
            </div>
        </div>
    )
}

export default ProfileTimelineLayout
