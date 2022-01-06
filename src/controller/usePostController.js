import { updateDoc } from "firebase/firestore";
import usePosts from "../firebase/usePosts";
import { searchResultContext } from "../layouts/feeds/SearchResultPopLayout";


export default function usePostController() {

    const { trash, love, unlove, listen, update, searchMain } = usePosts();


    async function listenPost(setter) {
        listen(snap => {
            const docs = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            // console.log(docs);
            setter(docs)
        })
    }

    async function trashPost(data) {
        const deleted = await trash(data)
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

    async function SearchMain(val) {
        searchResultContext.loc.set({ val, isActive: true })
        const docs = await searchMain(val)
        searchResultContext.loc.set({ items: docs })
    }

    return {
        trashPost,
        lovePost,
        listenPost,
        updatePost,
        SearchMain
    }
}