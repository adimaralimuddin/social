import { useRecoilState } from "recoil"
import postState from "../../../state/feedsState"
import PostComment from "../comments/PostComment"
import PostItem from "./PostItem"


function PostItemLayout({ data }) {

    return (
        <div className="back relative">
            <PostItem data={data} />
            <PostComment data={data} />
        </div>
    )
}

export default PostItemLayout
