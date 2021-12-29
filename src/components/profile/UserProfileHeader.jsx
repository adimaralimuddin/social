import { useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import useUserController from "../../controller/useUserController"
import { profileState } from "../../state/userState"
import { profileUrl, backUrl } from "../../temp"
import UserProfileAvatarBig from "./UserProfileAvatarBig"

function UserProfileHeader() {

    const profile = profileState(state => state.profile)
    const followers = profileState(state => state.followers)
    const following = profileState(state => state.following)
    const friends = profileState(state => state.friends)



    const divStyle = {
        background: `url(${backUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return (
        <div className=" br10 hidden m20 shadow1 b">
            <div
                style={divStyle}
                className='white p10 b mnh200 no-repeat center cover'
            >
            </div>
            <div className="white pb10 ">
                <div className="flx p20 itemCenter relative wrap">
                    <UserProfileAvatarBig data={{ url: profile?.photoUrl }} />
                    <span className="mnw190 mnh80"></span>
                    <div className="flxBetween flx1 wrap itemCenter mnw200">
                        <section >
                            <h2>{profile?.firstName} {profile?.lastName} {profile?.midName}</h2>
                            <p>{profile?.bio}</p>
                        </section>
                        <section>
                            <button className="mtb10">
                                <Link to='/profile/update' className="cWhite">Update Profile</Link>
                            </button>
                        </section>
                    </div>
                </div>
                <div className="flx p10 plr20 wrap">
                    <Link to='timeline '  >
                        <p className="mlr10">Timeline</p>
                    </Link>
                    <Link to='followers'  >
                        <p className="mlr10">followers {followers?.length || ''}</p>
                    </Link>
                    <Link to='following'  >
                        <p className="mlr10">following {following?.length || ''}</p>
                    </Link>
                    <Link to='friends'  >
                        <p className="mlr10">friends {friends?.length || ''}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserProfileHeader
