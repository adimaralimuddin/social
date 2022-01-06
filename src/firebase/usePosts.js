import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, documentId, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { postWriterStore } from "../components/posts/PostWriter";
import { feedsPosts } from "../state/feedsState";
import { profileState } from "../state/userState";
import { db, storage } from "./firebaseConfig";
export default function usePosts() {

    const profile = profileState(state => state.profile)
    const setFeedsPosts = feedsPosts(state => state.setPosts)
    const postRef = collection(db, 'posts')


    function add(data, { images }) {
        const dataToAdd = {
            ...data,
            images: images.val.length,
            userId: profile?.uid,
            dateAdded: serverTimestamp(),
            photoUrl: profile?.AvatarImage,
            userFullName: profile?.fullName || ''
        }
        addDoc(postRef, dataToAdd)
            .then(async snap => {
                await addPostImages(snap?.id, images)
                images.set([])
            })
    }

    async function addPostImages(postId, images) {
        await images.val.map(async (image, ind) => {
            if (!isEmpty(image.file)) {
                const fileRef = ref(storage, `images/posts/${postId}/${ind}`)
                const imageUploaded = await uploadBytes(fileRef, image.file)
                const imageUrl = await getDownloadURL(imageUploaded.ref)
                // await updateDoc(doc(db, 'posts', postId), { imagesUrls: arrayUnion(imageUrl) })
                await updateDoc(doc(db, 'posts', postId), { imagesUrls: arrayUnion({ comments: [], loves: [], url: imageUrl }) })
            }
        })
    }



    function isEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    async function getPostImages(postId, legnth) {
        if (legnth) {
            const imagesDownloaded = []
            for (let i = 0; i < legnth; i++) {
                const fileRef = ref(storage, `images/posts/${postId}/${i}`)
                const image = await getDownloadURL(fileRef)
                imagesDownloaded.push(image)
            }
            updateDoc(doc(db, 'posts', postId), { imagesUrls: imagesDownloaded })
            return imagesDownloaded
        }
    }

    function listen(call) {
        const q = query(postRef, orderBy('dateAdded', 'desc'))
        return onSnapshot(q, (snap) => {
            const docs = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setFeedsPosts(docs)
        })
    }

    async function trash(data) {
        if (data?.imagesUrls) {
            const urls = [...data?.imagesUrls]
            urls.map((url, ind) => {
                console.log(ind);
                const imgRef = ref(storage, `images/posts/${data?.id}/${ind}`)
                deleteObject(imgRef)
                    .then(() => console.log('deleted'))
                    .catch(err => console.log(err))
            })
        }
        await deleteDoc(doc(db, 'posts', data?.id))
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

    async function searchMain(val) {
        const q = query(collection(db, 'users'), where('firstName', '>=', val))
        const snap = await getDocs(q)
        return snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    }

    return {
        add,
        listen,
        trash,
        love,
        unlove,
        update,
        searchMain,
        getPostImages,
    }
}