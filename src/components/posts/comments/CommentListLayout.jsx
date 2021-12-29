import { useEffect, useState } from "react"
import useComment from "../../../firebase/useComment";
import CommentItem from "./CommentItem";


function CommentListLayout({ data }) {
    return (
        <div>
            {data && data.map(c => <CommentItem key={c?.id} data={c} />)}
        </div>
    )
}

export default CommentListLayout
