import { useEffect, useState } from "react"

import usePosts from '../firebase/usePosts'
import PostLayout from './PostLayout'

function PostsListsLayout({ data }) {

    const { listen } = usePosts();
    const [postIds, setPostIds] = useState([]);
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const unsub = listen(snap => {
            setPosts(snap?.docs?.map(doc => ({ ...doc.data(), id: doc.id })))
        })
        return unsub
    }, [])

    return (
        <div>
            {/* {posts && posts.map(p => <PostLayout key={p.id} data={p} />)} */}
            {data && data.map(p => <PostLayout key={p.id} data={p} />)}
        </div>
    )
}

export default PostsListsLayout
