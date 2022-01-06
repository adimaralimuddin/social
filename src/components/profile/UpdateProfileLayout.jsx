import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import ListItem from "../elements/ListItem"
import UpdateProfilePrimaryInfo from "./UpdateProfilePrimaryInfo";
import UpdateProfileProfile from "./UpdateProfileProfile";




const updateProfileLayoutContext = {
    getBody: name => updateProfileLayoutContext.body.querySelector(name)
}

function UpdateProfileLayout() {
    const par = updateProfileLayoutContext
    const firstBtn = useRef();
    const body = useRef()

    const [activeTab, setActiveTab] = useState('primary info')
    const [activeBtn, setActiveBtn] = useState(firstBtn?.current);

    useEffect(() => {
        par.body = body.current
    })


    useEffect(() => {

        const activeBtnLocal = localStorage.getItem('updateProfileActiveBtn')
        if (activeBtnLocal) {
            switch (activeBtnLocal) {
                case 'Primary Info':
                    par.getBody('#primaryinfobtn')?.classList.add('activeListItem')
                    setActiveBtn(par.getBody('#primaryinfobtn'))
                    break;
                case 'Profile':
                    par.getBody('#profilebtn')?.classList.add('activeListItem')
                    setActiveBtn(par.getBody('#profilebtn'))
                    break;

                default:
                    break;
            }
        } else {
            firstBtn.current?.classList.add('activeListItem')
            setActiveBtn(firstBtn.current)
        }
        const x = localStorage.getItem('updateProfileCurrentTab')
        setActiveTab(x)
    }, [])


    function selectTab(tab, { target }) {
        // console.log('select tab: ', tab);
        target.classList.add('activeListItem')
        setActiveTab(tab)
        localStorage.setItem('updateProfileCurrentTab', tab)

        activeBtn && activeBtn.classList.remove('activeListItem')
        setActiveBtn(target)
        localStorage.setItem('updateProfileActiveBtn', target?.textContent)

    }

    function popTabs() {
        // console.log(activeTab);
        switch (activeTab) {
            case 'profile':
                return <UpdateProfileProfile />
                break;
            case 'primary info':
                return <UpdateProfilePrimaryInfo />
                break;
            default:
                return null
                break;
        }
    }

    const navigate = useNavigate()
    function onCancelHandler() {
        navigate('/myprofile')
    }


    return (
        <div ref={body} className="p20 flxC itemCenter">
            <div className="box10shadow flx w100per mxw900 mnh500">
                <div className="flx1 mxw150 mnw100">
                    <p id='profilebtn' ref={firstBtn} onClick={e => selectTab('profile', e)} className="pointer p10 br10 hov-light2 " >Profile</p>
                    <ListItem id='primaryinfobtn' onClick={e => selectTab('primary info', e)}>Primary Info</ListItem>
                    <ListItem>Privacy</ListItem>
                    <ListItem>notification</ListItem>
                    <ListItem>Settings</ListItem>
                </div>
                <div className="flx2  ml20 flxC w100per mxw900 mnh500">
                    <div className=" flxEnd ">
                        <button onClick={onCancelHandler} className="trans shadow0 cdark b1s plr10 p5 hov-vio-5 hov-cwhite">close</button>
                    </div>
                    {popTabs()}

                </div>
            </div>
        </div >
    )
}

export default UpdateProfileLayout
