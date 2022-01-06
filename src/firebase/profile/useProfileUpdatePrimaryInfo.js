
import { doc, updateDoc } from 'firebase/firestore';
import { userState } from '../../state/userState';
import { db } from '../firebaseConfig'
import { profileState } from '../../state/userState'

function useProfileUpdatePrimaryInfo() {
    const profile = profileState(state => state.profile)

    async function updatePrimaryInfo(data) {
        console.log(data);
        await updateDoc(doc(db, 'users', profile?.uid), { ...data })
    }



    return {
        updatePrimaryInfo,
    }
}

export default useProfileUpdatePrimaryInfo
