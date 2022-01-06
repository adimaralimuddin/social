import { arrayRemove, arrayUnion, collection, doc, documentId, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore"
import { profileState, selectedProfileState, selectedProfileUidState } from "../state/userState";
import { db } from "./firebaseConfig"
import usePosts from "./usePosts";

export default function useProfile() {

    const profile = profileState(state => state.profile)
    const selectedProfile = selectedProfileState(state => state.profile)
    const uid = selectedProfileUidState(state => state.uid)

    const setProfile = profileState(state => state.setProfile)
    const setFollowers = profileState(state => state.setFollowers)
    const setFollowing = profileState(state => state.setFollowing)
    const setFriends = profileState(state => state.setFriends)
    const setPosts = profileState(state => state.setPosts)

    const setProfile_ = selectedProfileState(state => state.setProfile)
    const setFollowers_ = selectedProfileState(state => state.setFollowers)
    const setFollowing_ = selectedProfileState(state => state.setFollowing)
    const setFriends_ = selectedProfileState(state => state.setFriends)
    const setPosts_ = selectedProfileState(state => state.setPosts)

    const profileRef = collection(db, 'posts')
    const usersRef = collection(db, 'users')
    const userRef = (uid) => doc(db, 'users', uid)
    const { listen } = usePosts()

    // init the current profile data
    async function init(data) {
        await onSnapshot(doc(db, 'users', data?.uid), user => {
            setProfile({ ...user.data(), uid: user?.id })
            ProfilePost(data?.uid, setPosts)
            getFollows(user, setFollowers)
            getFollows(user, setFollowing, 'following')
            getFollows(user, setFriends, 'friends')
        })
        // listen()
    }

    async function initSelectedProfile(data) {
        await onSnapshot(doc(db, 'users', data?.uid), user => {
            setProfile_({ ...user.data(), uid: user?.id })
            ProfilePost(data?.uid, setPosts_)
            getFollows(user, setFollowers_)
            getFollows(user, setFollowing_, 'following')
            getFollows(user, setFriends_, 'friends')
        })
        // listen()
    }

    // get followers or following or any array of field
    async function getFollows(user, setter, field) {
        const followersId = field ? user.data()[field] : user.data().followers || []
        if (followersId.length > 0) {
            const q = query(collection(db, 'users'), where(documentId(), 'in', followersId))
            const snap = await getDocs(q)
            const followers = snap.docs.map(doc => ({ fullName: getDocFullName(doc), id: doc.id, photoUrl: getDocPhotoUrl(doc) }))
            setter(followers)
        } else {
            setter([])
        }
    }

    // get all the current profile posts
    async function ProfilePost(userId, setter) {
        const q = query(profileRef, where('userId', '==', userId), orderBy('dateAdded', 'desc'))
        return onSnapshot(q, post => {
            const docs = post.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setter(docs)
        })
    }

    // follow a user
    async function follow() {
        await updateDoc(userRef(uid), { followers: arrayUnion(profile?.uid) })
        await updateDoc(userRef(profile?.uid), { following: arrayUnion(uid) })

    }

    // unfollow a user
    async function unfollow() {
        await updateDoc(userRef(uid), { followers: arrayRemove(profile?.uid) })
        await updateDoc(userRef(profile?.uid), { following: arrayRemove(uid) })
    }


    // utils function to get doc fullname
    function getDocFullName(doc) {
        const { firstName, lastName } = doc.data()
        return firstName + ' ' + lastName
    }

    // utils function to get doc photoUrl
    function getDocPhotoUrl(doc) {
        return doc.data().photoUrl
    }

    return {
        init,
        initSelectedProfile,
        follow,
        unfollow
    }

}

