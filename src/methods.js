import useFollow from "./firebase/useFollow"
import { profileState } from "./state/userState"



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

export function isFollowed(uid, followers) {
    if (followers?.find(e => e == uid)) {
        return true
    } return false

}

export function isFriend(uid, friends) {
    if (Array.isArray(friends) && friends.length > 0 && friends?.map(e => e == uid)) {
        return true
    } return null;
}