

import { atomFamily, useSetRecoilState } from 'recoil'
import create from 'zustand'


const postState = atomFamily({
    key: 'post',
    default: {}
})
export default postState

export function useSetPostState(id) {
    const setPostState = useSetRecoilState(postState(id))
    return setPostState
}

export const postIdContext = create(set => ({
    postIds: [],
    setPostIds: (data) => set({ postIds: data })
}))

export const feedsPosts = create(set => ({
    posts: null,
    setPosts: (data) => set({ posts: data })
}))



