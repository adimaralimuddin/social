import { useEffect, useState } from "react";
import useCommentController from "../../../controller/useCommentController";
import useComment from "../../../firebase/useComment";
import CommentLayout from "../../../views/CommentLayout";
import CommentItem from "./CommentItem";
import CommentListLayout from "./CommentListLayout";
import CommentWriter from "./CommentWriter";


function PostComment({ data, refocus }) {

    const [open, setOpen] = useState(true)
    const [comments, setComments,] = useState([]);
    const { listenComment, postComment } = useCommentController();

    useEffect(() => listenComment(data, setComments), [])


    const onPostHandler = (body) => postComment({ ...data, mainPost: data?.id }, body, setComments)


    return (
        <div>
            <p className="plr10 white p5 pointer" onClick={() => setOpen(s => !s)}>comments</p>
            <PostCommentList open={open} onPostHandler={onPostHandler} data={comments} refocus={refocus} />
        </div>
    )
}

export default PostComment

function PostCommentList({ open, data, onPostHandler, refocus }) {
    if (open) {

        return <div className="gains p plr20">
            {data && data.map(c => <CommentLayout key={c?.id} data={c} />)}
            <CommentWriter onPost={onPostHandler} refocus={refocus} />

        </div>
    } return null
}



