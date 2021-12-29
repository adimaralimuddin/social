import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, documentId, FieldPath, getDoc, getDocs, increment, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import { db } from "./firebaseConfig"


export default function useComment() {

    // add a new comment/reply to the database function
    async function add(data) {
        const ret = await addDoc(collection(db, 'comments'), { ...data, dateAdded: serverTimestamp() })
        // update main post and the new comment to the comment list on the main poste
        updateDoc(doc(db, 'posts', data?.mainPost), {
            comments: arrayUnion(data?.userId),
            commentlists: arrayUnion(ret?.id)
        })

        // check if poster is not a main post,
        //if not, then add the current comment  to poster commentlists
        if (data?.mainPost != data?.postId) {
            updateDoc(doc(db, 'comments', data?.postId), {
                comments: arrayUnion(data?.userId),
                commentlists: arrayUnion(ret.id),
            })
        }

        return ret
    }

    // get the data from firesbase and return the snap
    async function load(id) {
        const q = query(collection(db, 'comments'), where('postId', '==', id), orderBy(documentId(), 'desc'))
        const qSnap = await getDocs(q)
        return qSnap;
    }

    // listen for data form firebase and return the snapshots to callback
    async function listen(id, call) {
        const q = query(collection(db, 'comments'), where('postId', '==', id), orderBy('dateAdded', 'desc'))
        return onSnapshot(q, call)
    }

    // delete the comment/reply function
    async function trash(data) {
        // update the main doc by removing the current comment/reply from the comment list on the mainpost
        updateDoc(doc(db, 'comments', data?.postId), { commentlists: arrayRemove(data?.id) })

        // loop throw each commentlist of the deleted comment/reply,
        // if commentlist items also has its own commentlist, then the loop goes on
        async function loop(com) {

            const id = com?.id
            const snap = await getDoc(doc(db, 'comments', id))

            // delete the current looped comment/reply
            deleteDoc(doc(db, 'comments', id))

            // remove the current deleted comment/reply from the mainPost commentlists
            updateDoc(doc(db, 'posts', data?.mainPost), {
                commentlists: arrayRemove(id)
            })

            // nested looping starts checking here
            const deletedDoc = snap.data()
            if (deletedDoc?.commentlists?.length > 0) {
                deletedDoc.commentlists.forEach(async doc => {
                    await loop({ id: doc })
                })
            }// end of nested looping
        }// end of loop funciton

        // starts the looping function
        await loop(data)
    }

    // love the coment/reply function
    async function love(data) {
        const commentRef = doc(db, 'comments', data?.id)
        return await updateDoc(commentRef, {
            loves: arrayUnion(data?.userId)
        })
    }




    // unlove the comment/reply function
    async function unlove(data) {
        const docRef = doc(db, 'comments', data?.id)
        return await updateDoc(docRef, { loves: arrayRemove(data?.userId) })
    }

    return {
        add,
        load,
        trash,
        listen,
        love,
        unlove
    }

}