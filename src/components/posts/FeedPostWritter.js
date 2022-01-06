// import { userState } from "../../state/userState";
// import usePosts from "../../firebase/usePosts";
// import PostWriter from "./PostWriter"

// function FeedPostWritter() {

//     const user = userState(state => state.user)
//     const { add } = usePosts();

//     function onPostHandler({ body }) {
//         const postData = {
//             userId: user.uid,
//             body
//         }
//         add(postData)
//     }
//     return (
//         <div>
//             <PostWriter onPost={onPostHandler} />
//         </div>
//     )
// }

// export default FeedPostWritter
