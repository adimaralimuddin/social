import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react/cjs/react.development";
import useProfileUpdatePrimaryInfo from "../../firebase/profile/useProfileUpdatePrimaryInfo";
import ProfileAboutLayout from "../../layouts/profile/timeline/ProfileAboutLayout";
import { profileState } from "../../state/userState"
import PostsListsLayout from "../../views/PostsListsLayout";
import FeedPostWritter from "../posts/FeedPostWritter";
import PostWriter from "../posts/PostWriter";
import { ProfilePageStore } from "./ProfilePage";


function MyProfile() {
    const store = profileState()
    return (
        <div className="flxC itemCenter">
            <div className="mxw900 w100per">
                <Header store={store} />
                <Footer store={store} />
                <Tabs store={store} />
            </div>
        </div>
    )
}

export default MyProfile


function Header({ store }) {
    return (
        <div className="hidden br10 m white shadow1 trans-pop flxC">
            <img className="mxh180" src={store?.profile?.featuredImage} alt="" />
            <header className="flx wrap p20">
                <img src={store?.profile?.AvatarImage} alt="" className="mxh150 mxw150 mnh150 mnw150 br90per shadow1" />
                <div className="p20 flxC itemStart">
                    <h2>{store?.profile?.fullName}</h2>
                    <p>{store?.profile?.bio}</p>
                    <Link to='/profile/update'>
                        <button>Update Profile</button>
                    </Link>
                </div>
            </header>
        </div>
    )
}

function Footer({ store }) {

    const timelineRef = useRef();
    const followersRef = useRef();
    const followingRef = useRef();
    const friendsRef = useRef();

    const btns = {
        timeline: timelineRef,
        followers: followersRef,
        following: followingRef,
        friends: friendsRef,
    }

    const style = 'active-btn'
    const defStyle = 'trans shadow0 cdark hov-light-1'

    useEffect(() => {
        btns[store?.activeBtn]?.current?.classList.add(style)
    })

    function onClickHander({ target }) {
        if (store?.activeBtn) {
            btns[store?.activeBtn]?.current?.classList.remove(style)
        }
        store?.setActiveBtn(target.name)
        target.classList.add(style)
    }

    return (
        <div className="flx plr10">
            <button onClick={onClickHander} name='timeline' ref={timelineRef} className={defStyle}>timeline </button>
            <button onClick={onClickHander} name='followers' ref={followersRef} className={defStyle}>followers {store?.profile?.followers.length}</button>
            <button onClick={onClickHander} name='following' ref={followingRef} className={defStyle}>following  {store?.profile?.following.length}</button>
            <button onClick={onClickHander} name='friends' ref={friendsRef} className={defStyle}>friends  {store?.profile?.friends.length}</button>
        </div>
    )
}

function Tabs({ store }) {
    const tabs = {
        timeline: <Timeline store={store} />,
        following: <Follows store={store} label='following' />,
        followers: <Follows store={store} label='followers' />,
        friends: <Follows store={store} label='friends' />,
    }
    if (store?.activeBtn && tabs[store?.activeBtn]) {
        return tabs[store?.activeBtn]
    }
    return <Timeline store={store} />
}

function Timeline({ store }) {
    return (
        <div className="flx wrap">
            <div className="m10 flx1 mnw250">
                <ProfileAboutLayout user={store?.profile} />
            </div>
            <div className="flx3 m10">
                <PostWriter />
                <PostsListsLayout data={store?.posts} />
            </div>
        </div>
    )
}


function Follows({ store, label }) {

    if (label && store?.[label] && store?.[label].length > 0) {

        return (
            <div className="flxC itemStart ptb20 p10 white br m shadow1 br10 mnh200">
                {store?.[label].map(follower => <FollowItem key={follower?.id} follower={follower} />)}
            </div>
        )
    } return <NoData label='Followers' />
}

function FollowItem({ follower }) {
    const setSelectedUid = ProfilePageStore(state => state.setSelectedUid)
    const navigate = useNavigate()

    function onSelectUserHandler(id) {
        console.log(id);
        setSelectedUid(id)
        navigate('/profile')
    }
    return (
        <div onClick={() => onSelectUserHandler(follower?.id)} className="p10 br m hov-light pointer flx itemCenter">
            <img src={follower?.AvatarImage || follower?.photoUrl} alt="" className="mxh40 mxw40 mnw40 mnh40 br90per shadow1" />
            <h3 className="mlr10">{follower?.fullName}</h3>
        </div>
    )
}

function NoData({ label }) {
    return <div className="flxCenter itemCenter mnh200 m20 p20 br10 white shadow1 trans-pop">
        <h3>No {label} Yet...</h3>
    </div>
}