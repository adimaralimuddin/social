import DisplayValue from "../../../components/elements/DisplayValue"
import { profileState } from "../../../state/userState"


function ProfileAboutLayout() {

    const profile = profileState(state => state.profile)
    if (profile) {

        return (
            // <div className="flxC itemCenter red">
            <div className="p20  white br10 w100per shadow1">

                <DisplayValue label='Gender' value={profile?.gender} />
                <DisplayValue label='Age' value={profile?.age} />
                <DisplayValue label='Date Of Birth' value={profile?.DOB} />
                <DisplayValue label='Current Address' value={profile?.['current address']} />
            </div>
            // </div>
        )
    } return <div className='mnh100 mnw200 white br10 flxC p10 '>
        <span className='dark1 p10 m5'></span>
        <span className='dark1 p10 m5 mxw100'></span>
        <span className='dark1 p10 m5 mxw150'></span>
    </div>
}

export default ProfileAboutLayout
