import create from 'zustand'
import { persist } from "zustand/middleware"
import { useEffect } from "react"
import { addUserArrayUser, getUserArrayUsers, getUserPosts, listenToUserByUid, listenUserArrayUsers, listenUserPosts, removeUserArrayUser } from "../../firestates/userFire"
import { profileState } from "../../state/userState"
import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react/cjs/react.development"


const ProfilePageData = set => ({
    selectedUid: null,
    selectedUser: null,
    followers: null,
    following: null,
    friends: null,
    posts: null,
    activeBtn: null,
    setSelectedUid: uid => set(prev => {
        if (uid != prev.selectedUid) {
            return {
                selectedUid: uid,
                selectedUser: null,
                followers: null,
                following: null,
                friends: null,
                posts: null,
            }
        }
    }),
    setSelectedUser: user => set({ selectedUser: user }),
    setFollowers: followers => set({ followers: followers }),
    setFollowing: following => set({ following: following }),
    setFriends: friends => set({ friends: friends }),
    setPosts: posts => set({ posts: posts }),
    setActiveBtn: name => set({ activeBtn: name }),
    setActiveTab: name => set({ activeTab: name }),
})
export const ProfilePageStore = create(persist(ProfilePageData))

function ProfilePage({ user = false }) {
    const store = ProfilePageStore()
    const navigate = useNavigate()


    useEffect(async () => {
        navigate(store?.activeBtn)
        return init(store)
    }, [store?.selectedUid])

    useEffect(() => {
    }, [store?.selectedUser])

    if (store?.selectedUser) {
        return (
            <div>
                <ProfileHeader store={store} />
                <ProfileFooter store={store} />
            </div>
        )
    }
    return <ProfilePageSplash />


}

export default ProfilePage

function ProfileHeader({ store }) {
    const { selectedUser } = store
    return (
        <div className="white br10 m mlr20 flxC hidden shadow1 trans-pop">
            <div className="mnh150" style={{ background: `url(${selectedUser?.featuredImage})` }}>

            </div>
            <div className="flxBetween wrap plr20 pb20 p20">
                <img src={selectedUser?.AvatarImage} alt="" className="mxh150 mxw150 br90per shadow1 mnh150 mnw150 " />
                <div className="flx1 m20 flxC itemStart">
                    <h3>{selectedUser?.fullName || `${selectedUser?.firstName} ${selectedUser?.lastName} ${selectedUser?.midName}`}</h3>
                    <p>{selectedUser?.bio}</p>
                    <FollowOption store={store} />
                </div>
            </div>
        </div>
    )
}

function ProfileFooter({ store }) {
    const naviage = useNavigate()
    const timelineRef = useRef()
    const followersRef = useRef()
    const followingRef = useRef()
    const friendsRef = useRef()
    const btnActiveStyle = 'active-btn'

    const btns = {
        timeline: timelineRef.current,
        followers: followersRef.current,
        following: followingRef.current,
        friends: friendsRef.current,
    }

    useEffect(() => {
        btns[store.activeBtn]?.classList.add(btnActiveStyle)
    })

    function onActiveHandler({ target }) {
        naviage(target.name)
        if (store.activeBtn) {
            btns[store.activeBtn]?.classList.remove(btnActiveStyle)
        }
        store.setActiveBtn(target.name)
        store.setActiveTab(target.name)
        target.classList.add(btnActiveStyle)
    }

    return (
        <div className='flx mlr20 mb10' >
            <button className='trans  shadow0 cdark fs15 hov-light-1' ref={timelineRef} name='timeline' onClick={onActiveHandler}>timeline </button>
            <button className='trans  shadow0 cdark fs15 hov-light-1' ref={followersRef} name='followers' onClick={onActiveHandler}>follower {store?.followers?.length}</button>
            <button className='trans  shadow0 cdark fs15 hov-light-1' ref={followingRef} name='following' onClick={onActiveHandler}>following {store?.following?.length}</button>
            <button className='trans  shadow0 cdark fs15 hov-light-1' ref={friendsRef} name='friends' onClick={onActiveHandler}>friends {store?.friends?.length}</button>
        </div >
    )
}


function checkIfProfileIsUser(user) {
    const profile = profileState(s => s.profile)
    if (user?.uid == profile?.uid) {
        return true
    }
    return false
}

function FollowOption({ store }) {
    const profile = profileState(s => s.profile)
    const { selectedUser, selectedUid, followers } = store
    if (!checkIfProfileIsUser(selectedUser)) {
        return (
            <div>
                {
                    followers?.find(e => e.uid == profile?.uid) ?
                        <button className="trans shadow0 b cdark hov-light " onClick={() => unFollowUser(selectedUid, profile?.uid)}>unfollow</button>
                        :
                        <button className="trans shadow0 b cdark hov-vio-3 hov-cwhite" onClick={() => followUser(selectedUid, profile?.uid)}>follow</button>
                }
                <button>message</button>
            </div >
        )
    }
    return null
}

function ProfilePageSplash() {
    return <div className="p20 m10 mlr20 br10 white mnh200 shadow1 flx">
        <div className=" dark8 br90per mnh150 mnw150 mxh150 mxw150 "></div>
        <div className="flx1 mxw300">
            <p className="p16 dark8 br m20"></p>
            <p className="p15 dark8 br m20 mxw150"></p>
            <p className="p10 dark8 br m20 mxw100"></p>
        </div>
    </div>
}


// logics
function init(store, user) {
    return listenToUserByUid(store?.selectedUid, async newUser => {
        if (newUser?.uid == store?.selectedUid) {

            const followers = await getUserArrayUsers(newUser, 'followers')
            const following = await getUserArrayUsers(newUser, 'following')
            const friends = await getUserArrayUsers(newUser, 'friends')

            store.setSelectedUser(newUser)
            listenUserPosts(store?.selectedUid, posts => store.setPosts(posts))

            store.setFollowers(followers)
            store.setFollowing(following)
            store.setFriends(friends)

        }

    })

}

export async function followUser(user, userUidToFollow) {
    // console.log('follow');
    addUserArrayUser(user, 'followers', userUidToFollow)
    addUserArrayUser(userUidToFollow, 'following', user)
}

export async function friendUser(user, userUidToFriend) {
    addUserArrayUser(user, 'friends', userUidToFriend)
}

export async function unFollowUser(user, userUidToUnfollow) {
    // console.log('unfollow');
    removeUserArrayUser(user, 'followers', userUidToUnfollow)
    removeUserArrayUser(userUidToUnfollow, 'following', user)
}

export async function unFriendUser(user, userUidToUnFriend) {
    removeUserArrayUser(user, 'friends', userUidToUnFriend)
}

export function selecteUserProfile() {

}