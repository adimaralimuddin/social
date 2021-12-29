import Input from "../elements/Input"

function UpdateProfilePrimaryInfo() {
    return (
        <>
            <h2>Primary Info</h2>
            <br />
            <Names />
            <AgeGenderStatus />
            <AddressContact />
        </>
    )
}

export default UpdateProfilePrimaryInfo

function Names() {
    return <div className="">
        <h3 className="ml20">Name</h3>
        <div className="flx wrap mt10">
            <Input name='firstName' label='First Name' className='flx1' />
            <Input name='lastName' label='last Name' className='flx1' />
            <Input name='midName' label='middle Name' className='flx1' />
        </div>
    </div>
}

function AgeGenderStatus() {
    return (
        <div className="">
            <h3 className="ml20 ">age/gender/address</h3>
            <span className="flx wrap mt10">
                <Input name='age' label='Age' className=' mxw100' />
                <Input name='gender' label='Gender' className='mxw100' />
                <Input name='DOB' label='Date Of Birth' className='flx1' />
            </span>
        </div>
    )
}

function AddressContact() {
    return <div>
        <h3 className="ml20 ">age/gender/address</h3>
        <div  className="flx wrap mt10">
            <Input name='currentAddress' label='Current Address' className='flx1' />
            <Input name='contact' label='contact' className='flx1' />
        </div>
    </div>
}