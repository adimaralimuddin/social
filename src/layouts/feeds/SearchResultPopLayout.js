import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import create from 'zustand'
import Avatar from '../../components/others/Avatars'
import { ProfilePageStore } from '../../components/profile/ProfilePage'
import { profileState } from '../../state/userState'

const store_ = set => ({})
const store = create(store_)

export const searchResultContext = {
    store,
}


function SearchResultPopLayout(props) {
    const par = searchResultContext
    const loc = useLoc({ val: 'miky', isActive: false })
    par.loc = loc


    if (par?.loc.isActive) {
        return (
            <div style={{ left: '10%' }} className=" absolute t60  w80per">
                <div className="white br10 m p b shadow1 mxw400 hidden">
                    {
                        par.loc.items?.map(item => <SearchItemResult data={item} />)
                    }
                </div>
            </div>
        )
    } return null
}

export default SearchResultPopLayout


export function SearchItemResult({ data }) {
    const setSelectedUid = ProfilePageStore(s => s.setSelectedUid)
    const navigate = useNavigate()
    const profile = profileState(state => state.profile)
    const location = useLocation()

    const onClickHandler = () => {
        searchResultContext.loc.set({ isActive: false })
        if (profile?.uid != data?.id) {
            setSelectedUid(data?.id)
            navigate('profile')
        } else {
            navigate('/myprofile')
        }
    }

    return <div onClick={onClickHandler} className='flx p10 br pointer itemCenter hov-light front'>
        <Avatar url={data?.photoUrl} />
        <h3 className='mlr10'>  {data?.firstName} {data?.lastName} {data?.midName}</h3>
    </div>
}

export function useLoc(init) {
    const [val, setter] = useState(init);
    const set = data => {
        setter(prev => ({ ...prev, ...data }))
    }
    return { ...val, set }
}
