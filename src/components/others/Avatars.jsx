import { userState } from "../../state/userState"
import { profileUrl } from "../../temp"

function Avatars({ url }) {
    const user = userState(state => state.user)
    return (
        <div >
            <img className="br90per mxh40 mxw40 mnw40 mnh40" src={url || profileUrl} alt="" />
        </div>
    )
}

export default Avatars
