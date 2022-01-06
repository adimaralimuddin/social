import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useComment from "../firebase/useComment";
import { profileState } from "../state/userState";

export default function useCommentController() {

    const profile = profileState(state => state.profile)
    const { trash, listen, add, love, unlove, } = useComment();

    async function trashComment(data) {
        const deleted = await trash(data)

    }

    function listenComment(data, setData) {
        const unsub = listen(data?.id, snap => {
            setData(snap.docs.map(d => ({ ...d.data(), id: d.id })))
            // setIds(snap.docs.map(d => d.id))
        })
        return unsub
    }

    async function postComment(data, body, setData) {
        const newData = {
            postId: data?.id,
            userId: data?.userId,
            AvatarImage: profile?.AvatarImage,
            fullName: profile?.fullName,
            mainPost: data?.mainPost,
            body,
            commentlists: [],
            loves: []
        }
        const snap = await add(newData)
        // setData(comments => ([...comments, { ...newData, id: snap.id }]))
    }

    async function loveComment(data) {
        // console.log(data);
        if (data?.loves?.find(d => d == data?.userId)) {
            unlove(data)
        } else {
            love(data)
        }
    }

    return {
        trashComment,
        listenComment,
        postComment,
        loveComment
    }
}

