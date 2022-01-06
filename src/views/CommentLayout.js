import { useEffect, useState } from "react"
import CommentItem from "../components/posts/comments/CommentItem";
import CommentWriter from "../components/posts/comments/CommentWriter";
import PostComment from "../components/posts/comments/PostComment"
import PostItem from "../components/posts/postItem/PostItem";
import ReplyItem from "../components/posts/replies/ReplyItem";
import useCommentController from "../controller/useCommentController";

function CommentLayout({ data }) {
    const [showReplies, setShowReplies] = useState(true);
    const [showActions, setShowActions] = useState(true)
    const { loveComment } = useCommentController();
    const [showReplyWriter, setShowReplyWriter] = useState(false)

    const toggleReplies = () => setShowReplies(s => !s)
    const onLoveHandler = () => loveComment(data)

    return (
        <div className="mtb30">
            <CommentItem setWriteReply={setShowReplyWriter} data={data} />
            <Footer onLove={onLoveHandler} onReply={toggleReplies} data={data} />
            <ReplyLayout showReplyWriter={showReplyWriter} onPost={setShowReplyWriter} data={data} opend={showReplies} />
        </div>
    )
}

export default CommentLayout


function ReplyLayout({ data, opend, showReplyWriter, onPost }) {
    const { postComment, listenComment } = useCommentController();
    const [replies, setReplies] = useState([]);


    useEffect(() => {

        const unsub = listenComment(data, setReplies)
        return unsub
    }, [])

    const onPostHandler = (body) => {
        postComment(data, body, setReplies)
        onPost(false)
    }

    if (opend) {
        return <div className="m10 ml20 relative">
            {
                replies.map(d => {
                    return <CommentLayout key={d?.id} data={d} />
                })
            }
            <div className=" t0 front">
                {
                    showReplyWriter && <CommentWriter tryFocus={showReplyWriter} showReplyWriter={onPost} focus={true} onPost={onPostHandler} />
                }
            </div>
        </div>
    }
    return null
}

function Footer({ data, onReply, onLove }) {
    const bStyle = 'ml5 pointer hov-cDark'
    return <div className="flx p0 plr10">
        <small onClick={onReply} className={bStyle}>Replies {data?.commentlists?.length > 0 ? data?.commentlists?.length : ''}</small>
        <small className={bStyle}>loves {data?.loves?.length > 0 ? data?.loves.length : ''}</small>
    </div>
}
