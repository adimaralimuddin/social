
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { userState } from '../state/userState';

export default function useFollow() {

    const user = userState(state => state.user)

    async function unFollow(data) {
        console.log(data);
        updateDoc(doc(db, 'users', user.uid), { following: arrayRemove(data?.id) })
    }

    async function unFriend(data) {
        console.log(data);
        updateDoc(doc(db, 'users', user?.uid), { friends: arrayRemove(data?.id) })
    }


    async function block(data) {
        console.log(data);
        updateDoc(doc(db, 'users', user?.uid), {
            followers: arrayRemove(data?.id),
            following: arrayRemove(data?.id),
            friends: arrayRemove(data?.id),
            blockList: arrayUnion(data?.id),
        })
    }

    return {
        unFollow,
        unFriend,
        block
    }
}