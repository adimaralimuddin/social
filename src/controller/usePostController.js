import { updateDoc } from "firebase/firestore";
import usePosts from "../firebase/usePosts";


export default function usePostController() {

    const { trash, love, unlove, listen, update } = usePosts();


    async function listenPost(setter) {
        listen(snap => {
            const docs = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            // console.log(docs);
            setter(docs)
        })
    }

    async function trashPost(id) {
        console.log(id);
        const deleted = await trash(id)
        console.log(deleted);
    }

    async function lovePost(data) {
        if (data?.loves?.find(d => d == data?.userId)) {
            unlove(data)
        } else {
            love(data)
        }
    }

    async function updatePost(data, call) {
        await update(data)
        call()
        // return call
    }

    return {
        trashPost,
        lovePost,
        listenPost,
        updatePost,
    }
}