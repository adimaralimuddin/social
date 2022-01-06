import { doc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { profileState } from "../../state/userState"
import { db, storage } from "../firebaseConfig"

const imagePath = (path, name) => 'images/' + path + '/' + name
const path = {
    images: {
        featured: name => imagePath('featured', name),
        Avatar: name => imagePath('Avatar', name),
    }
}

export default function useProfileUpdate() {

    const profile = profileState(state => state.profile)

    async function setProfileFeaturedImage(url) {
        return await updateDoc(doc(db, 'users', profile?.uid), { featuredImage: url })
    }

    async function getProfileFeaturedImage(uid = profile?.uid) {
        const fileRef = ref(storage, path.images.featured(uid))
        return await getDownloadURL(fileRef)
    }

    async function uploadProfileFeaturedImage(file, uid = profile?.uid) {
        const fileRef = ref(storage, path.images.featured(uid))
        return await uploadBytes(fileRef, file)

    }

    async function updateProfileFeaturedImage(file, uid = profile?.uid) {
        await uploadProfileFeaturedImage(file, uid)
        const url = await getProfileFeaturedImage(uid)
        return await setProfileFeaturedImage(url)
    }

    // avatar functions
    async function setProfileAvatarImage(url) {
        return await updateDoc(doc(db, 'users', profile?.uid), { AvatarImage: url })
    }

    async function getProfileAvatarImage(uid = profile?.uid) {
        const fileRef = ref(storage, path.images.Avatar(uid))
        return await getDownloadURL(fileRef)
    }

    async function uploadProfileAvatarImage(file, uid = profile?.uid) {
        const fileRef = ref(storage, path.images.Avatar(uid))
        return await uploadBytes(fileRef, file)

    }

    async function updateProfileAvatarImage(file, uid = profile?.uid) {
        await uploadProfileAvatarImage(file, uid)
        const url = await getProfileAvatarImage(uid)
        return await setProfileAvatarImage(url)
    }

    async function updateBio(data) {
        await updateDoc(doc(db, 'users', profile?.uid), { bio: data })
    }

    return {
        uploadProfileFeaturedImage,
        getProfileFeaturedImage,
        setProfileFeaturedImage,
        updateProfileFeaturedImage,

        uploadProfileAvatarImage,
        getProfileAvatarImage,
        setProfileAvatarImage,
        updateProfileAvatarImage,

        updateBio,


    }
}