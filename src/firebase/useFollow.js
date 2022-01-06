
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { profileState, userState } from '../state/userState';

export default function useFollow() {

    const user = userState(state => state.user)
    const profile = profileState(state => state.profile)

    const userRef = uid => doc(db, 'users', uid)

    async function follow(data) {
        updateDoc(userRef(profile?.uid), { following: arrayUnion(data?.uid) })
    }

    async function unFollow(data) {
        // console.log(data);
        // console.log('unfollow');
        updateDoc(doc(db, 'users', profile?.uid), { following: arrayRemove(data?.uid) })
    }

    async function addFriend(data) {
        updateDoc(userRef(profile?.uid), { friends: arrayUnion(data?.uid) })
    }

    async function unFriend(data) {
        // console.log(data);
        updateDoc(doc(db, 'users', user?.uid), { friends: arrayRemove(data?.uid) })
    }




    async function block(data) {
        // console.log(data);
        updateDoc(doc(db, 'users', user?.uid), {
            followers: arrayRemove(data?.id),
            following: arrayRemove(data?.id),
            friends: arrayRemove(data?.id),
            blockList: arrayUnion(data?.id),
        })
    }

    return {
        follow,
        unFollow,
        addFriend,
        unFriend,
        block,
    }
}