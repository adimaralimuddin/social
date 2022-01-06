
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebaseConfig"

const imagePath = (path, name) => 'images/' + path + '/' + name
const path = {
    images: {
        featured: name => imagePath('featured', name),
        Avatar: name => imagePath('Avatar', name),
    }
}

export default function useStorage() {


    async function upload(file, name) {
        const stoRef = ref(storage, name)
        uploadBytes(stoRef, file)
            .then(snap => {
                console.log('uploaded ');
                console.log(snap);
            })
    }

    async function dowloadUrl(name) {
        const fileRef = ref(storage, name)
        return await getDownloadURL(fileRef)
    }
    async function uploadFeaturedImage(file, uid) {
        const stoRef = ref(storage, path.images.featured(uid))
        return await uploadBytes(stoRef, file)
    }
    async function uploadAvatarImage(file, uid) {
        const stoRef = ref(storage, 'images/avatar/' + uid)
        return await uploadBytes(stoRef, file)
    }
    async function downloadFeaturedImage(uid) {
        const fileRef = ref(storage, 'images/featured' + uid)
        return await getDownloadURL(fileRef)
    }



    return {
        upload,
        dowloadUrl,
        uploadFeaturedImage,
        uploadAvatarImage,
        downloadFeaturedImage
    }
}