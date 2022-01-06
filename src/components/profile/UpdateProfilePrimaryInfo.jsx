import { useEffect, useState } from "react"
import useProfileUpdatePrimaryInfo from "../../firebase/profile/useProfileUpdatePrimaryInfo"
import { updateProfilePrimaryInfoState, profileState } from "../../state/userState"
import BtnSec from "../elements/BtnSec"
import Input from "../elements/Input"
import LoadingState from '../LoadingState'

function UpdateProfilePrimaryInfo() {

    const [isUpdating, setIsUpdating] = useState(false);
    const profile = profileState(state => state.profile)
    const state = updateProfilePrimaryInfoState()
    const { updatePrimaryInfo } = useProfileUpdatePrimaryInfo();


    // console.log(profile);
    async function onUpdateHandler() {
        setIsUpdating(true)
        await updatePrimaryInfo(state.primaryInfo)
        setIsUpdating(false)
    }

    const onResetHandler = () => state.setPrimaryInfo({})


    function onInputHandler({ target }) {
        state.setPrimaryInfo({ ...state.primaryInfo, [target.name]: target.value })
    }

    return (
        <div className='relative'>
            <h2>Primary Info</h2>
            <br />
            <Names data={state.primaryInfo} onInput={onInputHandler} />
            <AgeGenderStatus data={state?.primaryInfo} onInput={onInputHandler} />
            <AddressContact data={state?.primaryInfo} onInput={onInputHandler} />
            <div>
                <BtnSec onClick={onResetHandler}>reset</BtnSec>
                <button onClick={onUpdateHandler}>save Chnages</button>
            </div>
            <LoadingState state={isUpdating} caption='UPDATING PRIMARY INFO...' />
        </div>
    )
}

export default UpdateProfilePrimaryInfo

function Names({ data, onInput }) {
    const profile = profileState(state => state.profile)

    return <div className="">
        <h3 className="ml20">Name</h3>
        <div className="flx wrap mt10">
            <Input value={data?.firstName || profile?.firstName} onChange={onInput} name='firstName' label='First Name' className='flx1' />
            <Input value={data?.lastName || profile?.lastName} onChange={onInput} name='lastName' label='last Name' className='flx1' />
            <Input value={data?.midName || profile?.midName} onChange={onInput} name='midName' label='middle Name' className='flx1' />
        </div>
    </div>
}

function AgeGenderStatus({ data, onInput }) {
    const profile = profileState(state => state.profile)

    return (
        <div className="">
            <h3 className="ml20 ">age/gender/address</h3>
            <span className="flx wrap mt10">
                <Input value={data?.age || profile?.age} onChange={onInput} name='age' label='Age' className=' mxw100' />
                <Input value={data?.gender || profile?.gender} onChange={onInput} name='gender' label='Gender' className='mxw100' />
                <Input value={data?.DOB || profile?.DOB} onChange={onInput} name='DOB' label='Date Of Birth' className='flx1' />
            </span>
        </div>
    )
}

function AddressContact({ data, onInput }) {
    const profile = profileState(state => state.profile)

    return <div>
        <h3 className="ml20 ">age/gender/address</h3>
        <div className="flx wrap mt10">
            <Input value={data?.currentAddress || profile?.currentAddress} onChange={onInput} name='currentAddress' label='Current Address' className='flx1' />
            <Input value={data?.contact || profile?.contact} onChange={onInput} name='contact' label='contact' className='flx1' />
        </div>
    </div>
}