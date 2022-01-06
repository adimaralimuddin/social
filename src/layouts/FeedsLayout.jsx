import { useEffect } from "react/cjs/react.development"
import PostWriter from "../components/posts/PostWriter"
import usePosts from "../firebase/usePosts"
import { feedsPosts } from "../state/feedsState"
import PostsListsLayout from "../views/PostsListsLayout"


function FeedsLayout() {

    const { listen } = usePosts()
    const feedsPosts_ = feedsPosts(state => state.posts)

    useEffect(() => {
        return listen()
    }, [])

    return (
        <div className="flxC itemCenter">
            <div className="w100per mxw500">
                <PostWriter />
                <PostsListsLayout data={feedsPosts_}/>
            </div>
        </div>
    )
}

export default FeedsLayout
