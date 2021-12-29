import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import postState, { feedsPosts, postIdContext, useSetPostState } from "../state/feedsState";
import { profileState } from "../state/userState";
import { db } from "./firebaseConfig";

export default function usePosts() {

    const profile = profileState(state => state.profile)
    const setFeedsPosts = feedsPosts(state => state.setPosts)

    const postRef = collection(db, 'posts')
    const setPostIds = postIdContext(state => state.setPostIds);


    function add(data) {
        const dataToAdd = {
            ...data,
            dateAdded: serverTimestamp(),
            photoUrl: profile?.photoUrl,
            userFullName: profile?.fullName
        }
        addDoc(postRef, dataToAdd)
            .then(snap => {
                console.log({ snap });
            })
    }

    function listen(call) {
        return onSnapshot(postRef, snap => {
            const docs = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setFeedsPosts(docs)
        })
    }

    async function trash(id) {
        console.log({ id });
        return await deleteDoc(doc(db, 'posts', id))
    }

    async function love(data) {
        console.log({ data });
        return await updateDoc(doc(db, 'posts', data?.id), { loves: arrayUnion(data?.userId) })
    }

    async function unlove(data) {
        return await updateDoc(doc(db, 'posts', data?.id), { loves: arrayRemove(data?.userId) })
    }

    async function update(data) {
        return await updateDoc(doc(db, 'posts', data?.id), { body: data?.body, lastUpdated: serverTimestamp() })
    }

    return {
        add,
        listen,
        trash,
        love,
        unlove,
        update,
    }
}