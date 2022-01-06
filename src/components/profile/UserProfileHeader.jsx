import { useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import useUserController from "../../controller/useUserController"
import useProfile from "../../firebase/useProfile"
import { profileState, selectedProfileState, selectedProfileUidState } from "../../state/userState"
import { profileUrl, backUrl } from "../../temp"
import UserProfileAvatarBig from "./UserProfileAvatarBig"

function UserProfileHeader() {

    const { follow, unfollow, initSelectedProfile } = useProfile();
    const uid = selectedProfileUidState(state => state.uid)
    const myProfile = profileState(state => state.profile)

    const profile = selectedProfileState(state => state.profile)
    const followers = selectedProfileState(state => state.followers)
    const following = selectedProfileState(state => state.following)
    const friends = selectedProfileState(state => state.friends)

    console.log('init');
    useEffect(() => {
        // initSelectedProfile({ uid })
        console.log('init,', uid);
    }, [profile?.uid], uid)

    function isFollowed() {
        return profile?.followers.find(s => s == myProfile?.uid)
    }



    return (
        <div>
            {
                // profile?.uid == uid
                true ?
                    <IfHasProfile data={{
                        profile,
                        myProfile,
                        followers, following, friends, uid,
                        isFollowed, follow, unfollow
                    }} /> :
                    <div>

                    </div>
            }

        </div >


    )
}

export default UserProfileHeader

function IfHasProfile({ data }) {
    const divStyle = {
        // background: `url(${profile?.featuredImage || backUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    return (
        <div>
            <div
                style={divStyle}
                className='flx white p20  mnh200 no-repeat center cover gains'
            >
                <UserProfileAvatarBig data={{ url: data?.profile?.AvatarImage }} />
                <section className="flx1 itemStart p20 flxCCenter">
                    <h2>{data?.profile?.firstName} {data?.profile?.lastName} {data?.profile?.midName}</h2>
                    <p>{data?.profile?.bio}</p>
                    <section className="">
                        <IfProfileEqual cond={false}>
                            <FollowButton isFollowed={data?.isFollowed} follow={data?.follow} unfollow={data?.unfollow} />
                            <button className="">message</button>
                        </IfProfileEqual>
                    </section>
                </section>
                <section className="flxC ">
                    <IfProfileEqual>
                        <button><Link to='/profile/update' className="cWhite">Update Profile</Link></button>
                    </IfProfileEqual>
                </section>

            </div>
            <div className="white pb10 ">
                {

                }
                <div className="flx p10 plr20 wrap">

                    <Link to='timeline '  >
                        <p className="mlr10">Timeline</p>
                    </Link>
                    <Link to='followers'  >
                        <p className="mlr10">followers {data?.followers?.length || ''}</p>
                    </Link>
                    <Link to='following'  >
                        <p className="mlr10">following {data?.following?.length || ''}</p>
                    </Link>
                    <Link to='friends'  >
                        <p className="mlr10">friends {data?.friends?.length || ''}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

function IfProfileEqual({ children = null, cond = true }) {
    const myProfile = profileState(state => state.profile)
    const profile = selectedProfileState(state => state.profile)

    if (cond) {
        if (myProfile?.uid == profile?.uid) {
            return children
        }
    } else {
        if (myProfile?.uid != profile?.uid) {
            return children
        }
    }
    return null
}

function FollowButton({ isFollowed, unfollow, follow }) {

    if (isFollowed()) {
        return <button onClick={unfollow} className="br0 trans shadow0 cdark b1s hov-dark3 hov-cwhite">Unfollow</button>
    } else {
        return <button onClick={follow} className="br0 trans cdark shadow1 b1s hov-vio-5 hov-cwhite">follow</button>
    }
}
