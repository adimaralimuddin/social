import CommentWriter from "./CommentWriter"


function CommentLayout({ id, onPost }) {


    return (
        <div>
            <CommentWriter onPost={onPost} />
        </div>
    )
}

export default CommentLayout
