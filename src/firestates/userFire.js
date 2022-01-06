import { arrayRemove, arrayUnion, collection, doc, documentId, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const usersCollectionRef = collection(db, 'users')
const userDoc = uid => doc(db, 'users', uid)

export function listenToUserByUid(uid, returnCall) {
    return onSnapshot(userDoc(uid), user => returnCall({ ...user.data(), uid: user.id }))
}

export async function getUserByUid(uid) {
    const doc = await getDoc(userDoc(uid))
    return { ...doc.data(), uid: doc.id }
}

export async function getUserArrayUsers(user, arrayName) {
    if (user && user?.[arrayName] && user?.[arrayName].length > 0) {
        const q = query(usersCollectionRef, where(documentId(), 'in', user?.[arrayName]))
        const usersLists = await getDocs(q)
        return usersLists.docs.map(d => ({ AvatarImage: d.data()?.AvatarImage, firstName: d.data()?.firstName, uid: d.id }))
    }
}

export async function listenUserArrayUsers(user, arrayName, returnCall) {
    if (user && user?.[arrayName] && user?.[arrayName].length > 0) {
        const q = query(usersCollectionRef, where(documentId(), 'in', user?.[arrayName]))
        return onSnapshot(q,
            snap => returnCall(snap.docs.map(d => ({ AvatarImage: d.data()?.AvatarImage, firstName: d.data()?.firstName, uid: d.id }))))
    }
}


export async function removeUserArrayUser(user, arrayName, userRemove) {
    if (true) {
        const result = await updateDoc(userDoc(user), { [arrayName]: arrayRemove(userRemove) })
    }
}

export async function addUserArrayUser(user, arrayName, userRemove) {
    if (true) {
        const result = await updateDoc(userDoc(user), { [arrayName]: arrayUnion(userRemove) })
    }
}

export async function getUserPosts(uid) {
    const q = query(collection(db, 'posts'), where('userId', '==', uid))
    const posts = await getDocs(q)
    return posts.docs.map(d => ({ ...d.data(), id: d.id }))
}

export async function listenUserPosts(uid, returnCall) {
    // console.log(uid);
    const q = query(collection(db, 'posts'), where('userId', '==', uid))
    return onSnapshot(q, snap => {
        returnCall(snap.docs.map(d => ({ ...d.data(), id: d.id })))
    })
}



