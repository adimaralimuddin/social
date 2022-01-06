import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useFollow from "../../firebase/useFollow"
import { isFollowed, isFollowedByCurrentUser, isFriend } from "../../methods"
import { profileState } from "../../state/userState"
import Avatars from "../others/Avatars"
import { followUser, ProfilePageStore, unFollowUser } from "./ProfilePage"


function UserItemGrid({ data, options }) {

    const [showOption, setShowOption] = useState(false)
    const [showOptionPop, setShowOptionPop] = useState(false)
    const setSelectedUid = ProfilePageStore(state => state.setSelectedUid)
    const activeTab = ProfilePageStore(s => s.activeTab)
    const profile = profileState(state => state.profile)
    const navigate = useNavigate()

    function onSelectHandler() {
        if (profile?.uid != data?.uid) {
            setSelectedUid(data?.uid)
        } else {
            navigate('/myprofile')
        }
    }

    return (
        <div
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
            onClick={onSelectHandler}
            className="white p br10 mtb10 hov-light pointer">
            <header className="flxBetween itemCenter ">
                <div className="flx itemCenter">
                    <Avatars url={data?.photoUrl} />
                    <h3 className="mlr10">{data?.fullName || `${data?.firstName} ${data?.lastName || ''} ${data?.midName || ''}`}</h3>
                </div>
                <div className="relative itemCenter flx">
                    {/* {
                        showOption &&
                        <span onClick={() => setShowOptionPop(true)} className="material-icons pointer hov-enlarge">
                            more_horiz
                        </span>
                    } */}
                    {/* <OptionPop data={data} options={options} open={showOptionPop} onMouseLeave={() => setShowOptionPop(false)} /> */}
                </div>
            </header>
            <div>

            </div>
        </div>
    )
}

export default UserItemGrid

function OptionPop({ data, open, options, onMouseLeave }) {
    // console.log(data);
    const profile = profileState(s => s.profile)
    // const { unFollow, unFriend, block, follow, addFriend } = useFollow()


    if (open) {
        return (
            <div className="pt40 absolute t-10 r0 " onMouseLeave={onMouseLeave}>
                <div className=" b white p10 shadow1 br10 mnw100 mnh100" >

                    {
                        isFollowed(data?.uid, profile?.following) ?
                            <button onClick={() => unFollowUser(data?.uid, profile?.uid)}>unfollow</button>
                            :
                            <button onClick={() => followUser(data?.uid, profile?.uid,)}>follow</button>
                    }

                    {
                        isFriend(data?.uid, profile?.friends) ?
                            ''
                            // <button onClick={() => unFriend(data)}>unfriend</button>
                            :
                            ''
                        // <button onClick={() => addFriend(data)}>add friend</button>
                    }
                </div>
            </div>
        )
    } return null
}
