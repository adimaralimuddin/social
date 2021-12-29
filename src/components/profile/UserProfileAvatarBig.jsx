import { profileUrl } from "../../temp"


function UserProfileAvatarBig({ data }) {


    return (
        <img
            className="absolute t-80 p3 shadow1 mnh170 mnw170 mxh170 mxw170 br90per white p0 b "
            src={data?.url || profileUrl}
            alt="" />
    )
}

export default UserProfileAvatarBig
