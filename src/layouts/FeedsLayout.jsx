import { feedsPosts } from "../state/feedsState"
import Feeds from "./Feeds"


function FeedsLayout() {

    const feedsPosts_ = feedsPosts(state => state.posts)

    return (
        <div>
            <Feeds data={feedsPosts_} />
        </div>
    )
}

export default FeedsLayout
