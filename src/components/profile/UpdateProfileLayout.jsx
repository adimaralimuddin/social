import { useEffect, useRef, useState } from "react"
import ListItem from "../elements/ListItem"
import UpdateProfilePrimaryInfo from "./UpdateProfilePrimaryInfo";
import UpdateProfileProfile, { Stupid } from "./UpdateProfileProfile";

function UpdateProfileLayout() {

    const firstBtn = useRef();
    const [currentTab, setCurrentTab] = useState('profile');
    const [activeBtn, setActiveBtn] = useState(firstBtn?.current);

    const tabs = {
        profile: 'profile',
        primaryInfo: 'primary info'
    }

    useEffect(() => {
        setActiveBtn(firstBtn.current)
        firstBtn.current?.classList.add('activeListItem')
    }, [])


    function selectTab(tab, { target }) {
        console.log(tab);
        target.classList.add('activeListItem')
        setCurrentTab(tab)
        activeBtn && activeBtn.classList.remove('activeListItem')
        setActiveBtn(target)
    }

    function popTabs() {
        switch (currentTab) {
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


    return (
        <div className="p20 flxC itemCenter">
            <div className="box10shadow flx w100per mxw900 mnh500">
                <div className="flx1 mxw150 mnw100">
                    <p ref={firstBtn} onClick={e => selectTab(tabs.profile, e)} className="pointer p10 br10 hov-light2 " >profile file</p>
                    <ListItem onClick={e => selectTab(tabs.primaryInfo, e)}>Primary Info</ListItem>
                    <ListItem>Privacy</ListItem>
                    <ListItem>notification</ListItem>
                    <ListItem>Settings</ListItem>
                </div>
                <div className="flx2  ml20 flxC w100per mxw900 mnh500">

                    {popTabs()}
                    {/* {
                        currentTab == 'profile' ?
                            <UpdateProfileProfile />
                            : currentTab == 'primary info' ?
                                <UpdateProfileProfile />
                                : 'dsfd'

                    } */}


                </div>
            </div>
        </div >
    )
}

export default UpdateProfileLayout
