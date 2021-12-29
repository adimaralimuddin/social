import CommentLayout from "../../../views/CommentLayout"
import CommentItem from "../comments/CommentItem"


function ReplyItem({ data }) {
    return (
        <div className="flxC textLeft ">
            <CommentLayout data={data} />
        </div>
    )
}

export default ReplyItem


