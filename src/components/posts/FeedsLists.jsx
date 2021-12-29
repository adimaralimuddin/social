import { useEffect } from "react"
import { postIdContext } from "../../state/feedsState"
import usePosts from "../../firebase/usePosts"
import PostItemLayout from "./postItem/PostItemLayout"


function FeedsLists() {

    const { listen } = usePosts()
    const postIds = postIdContext(state => state.postIds)

    useEffect(() => {
        // listen()
    }, [])
    return (
        <div>
            {
                // postIds && postIds.map(post => <PostItemLayout key={post.id} data={post} />)
            }
        </div>
    )
}

export default FeedsLists
