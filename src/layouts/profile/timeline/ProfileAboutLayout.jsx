import DisplayValue from "../../../components/elements/DisplayValue"
import { ProfilePageStore } from "../../../components/profile/ProfilePage"


function ProfileAboutLayout({ user }) {
    // const user = ProfilePageStore(state => state.user)

    if (user) {
        return (
            <div className="p20  white br10 w100per shadow1 trans-pop mnh200">
                <DisplayValue label='Gender' value={user?.gender} />
                <DisplayValue label='Age' value={user?.age} />
                <DisplayValue label='Date Of Birth' value={user?.DOB} />
                <DisplayValue label='Current Address' value={user?.currentAddress} />
            </div>
        )
    }
    
    return <div className='mnh100 mnw200 white br10 flxC p10 '>
        <span className='dark8 br p10 m5'></span>
        <span className='dark8 br p10 m5 mxw100'></span>
        <span className='dark8 br p10 m5 mxw150'></span>
    </div>
}

export default ProfileAboutLayout
