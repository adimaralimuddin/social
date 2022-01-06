import { profileUrl } from "../../temp"


function UserProfileAvatarBig({ data, url }) {


    return (
        <img
            className=" t-80 p3 shadow1 mnh170 mnw170 mxh170 mxw170 br90per white p0 b"
            src={url || profileUrl}
            alt="" />
    )
}

export default UserProfileAvatarBig
