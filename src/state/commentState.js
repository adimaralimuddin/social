import { atomFamily } from "recoil";


const commentState = atomFamily({
    key: 'comment',
    default: null
})

export default commentState


