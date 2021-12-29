import useFollow from "./firebase/useFollow"



export default function useMethods() {


    const follow = useFollow()

    function method(label, method) {
        return { label, method }
    }

    const block = method('block', follow.block)
    const unFollow = method('unFollow', follow.unFollow)
    const unFriend = method('unFriend', follow.unFriend)


    return {
        block,
        unFollow,
        unFriend
    }

}