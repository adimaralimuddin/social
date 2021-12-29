import FeedPostWritter from "../components/posts/FeedPostWritter"
import FeedsLists from "../components/posts/FeedsLists"
import PostWriter from "../components/posts/PostWriter"
import PostsListsLayout from "../views/PostsListsLayout"


function Feeds({ data }) {
    return (
        <div className="flxC itemEnd">
            <div className="mxw500 w100per">
                <FeedPostWritter />
                <PostsListsLayout data={data} />
            </div>
        </div>
    )
}

export default Feeds
