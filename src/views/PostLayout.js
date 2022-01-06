import { useState } from "react/cjs/react.development"
import PostComment from "../components/posts/comments/PostComment"
import PostItem from "../components/posts/postItem/PostItem"

function PostLayout({ data }) {




    const [commentFoc, setCommentFoc] = useState();

    function onRefocusHander() {
        commentFoc?.focus()
    }

    return (
        <div className="br10 mtb10 hidden shadow1 b trans-pop">
            <PostItem refocus={onRefocusHander} data={data} />
            <PostComment refocus={(ref) => setCommentFoc(ref)} data={data} />
        </div>
    )
}

export default PostLayout
