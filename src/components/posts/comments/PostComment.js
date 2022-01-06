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
        <div className="back flxC h100per trans">
            <p className="plr20 white p5 pointer " onClick={() => setOpen(s => !s)}>{open ? 'hide comments' : 'show comments'}</p>
            <PostCommentList open={open} onPostHandler={onPostHandler} data={comments} refocus={refocus} />
        </div>
    )
}

export default PostComment

function PostCommentList({ open, data, onPostHandler, refocus }) {
    if (open) {

        return <div className="white p  back flx1 flxC h100per">
            <div className="flx1">
                {data && data.map(c => <CommentLayout key={c?.id} data={c} />)}
            </div>
            <CommentWriter onPost={onPostHandler} refocus={refocus} />

        </div>
    } return null
}



