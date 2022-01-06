import { useState } from "react";
import { useEffect, useRef } from "react/cjs/react.development";
import { updateProfileProfileState } from "../../state/userState";
import { featuredUrl, profileUrl } from "../../temp"
import FloatingIcon from "../elements/FloatingIcon"
import Input from "../elements/Input"
import useStorage from "../../firebase/useStorage";
import { profileState } from '../../state/userState'
import useProfileUpdate from "../../firebase/profile/useProfileUpdate";
import ResetIcon from "../elements/ResetIcon";
import LoadingState from "../LoadingState";

function UpdateProfileProfile() {

    // updating states
    const [isUpdating, setIsUpdating] = useState(false);

    // firebase storage
    const { uploadFeaturedImage, uploadAvatarImage } = useStorage();
    const { updateProfileAvatarImage, updateProfileFeaturedImage, updateBio } = useProfileUpdate();

    // states
    const profile = profileState(state => state.profile)
    const state = updateProfileProfileState(state => state)

    // useStates
    const [featuredImageUrl, setFeaturedImageUrl] = useState();
    const [avatarImageUrl, setAvatarImageUrl] = useState();
    const [bio, setBio] = useState(profile?.bio)

    //refs
    const imgViewer = useRef();
    const featureImagePickerRef = useRef();
    const AvatarImagePickerRef = useRef();

    function featuredImageFilePicker({ target }) {
        target.files && target?.files.length === 1 && state.setFeaturedImageFile(target.files[0])
    }

    function avatarImageFilePicker({ target }) {
        target.files && target?.files.length === 1 && state.setAvatarImageFile(target.files[0])
    }

    function pickFeaturedImageHandler() {
        featureImagePickerRef.current?.click()
    }

    function pickAvatarImageHandler() {
        AvatarImagePickerRef.current?.click()
    }

    function viewFeauredImageUrl() {
        if (state.featuredImageFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setFeaturedImageUrl(reader.result)
            }
            reader.readAsDataURL(state.featuredImageFile)
        }
    }

    function viewAvatarImageUrl() {
        if (state.avatarImageFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarImageUrl(reader.result)
            }
            reader.readAsDataURL(state.avatarImageFile)
        }
    }

    async function onSaveHandler() {
        setIsUpdating(true)
        if (state.featuredImageFile) {
            await updateProfileFeaturedImage(state.featuredImageFile)
        }
        if (state.avatarImageFile) {
            await updateProfileAvatarImage(state.avatarImageFile)
        }
        if (bio != profile?.bio) {
            await updateBio(bio)
        }
        setIsUpdating(false)
    }


    function resetFeaturedImagePicker() {
        state.setFeaturedImageFile(null)
        setFeaturedImageUrl(null)
    }

    function resetAvatarImagePicker() {
        state.setAvatarImageFile(null)
        setAvatarImageUrl(null)
    }


    useEffect(() => {
        viewFeauredImageUrl()
        viewAvatarImageUrl()
        setBio(profile?.bio)
    }, [state.featuredImageFile, state.avatarImageFile, profile?.bio])

    return (
        <div className="">
            <input style={{ display: 'none' }} ref={featureImagePickerRef} onChange={featuredImageFilePicker} type="file" />
            <input style={{ display: 'none' }} ref={AvatarImagePickerRef} onChange={avatarImageFilePicker} type="file" />

            <h2>Profile</h2>
            <div className="flxC br10 br10 shadow1 hidden b ">
                <div className="flx">
                    <div className="w100per flxC">
                        <img ref={imgViewer} className="mnh150 mxh150 bb w100per " src={featuredImageUrl || profile?.featuredImage || featuredUrl} alt="update profile featured image" />
                        <div className="flx">
                            <span className="flx">
                                <img
                                    // style={{ transform: 'translate(20px,-50px)', zIndex: 0 }}
                                    className="  mnh100 mnw100 br90per mxw100 mxh100 gains b shadow1"
                                    src={avatarImageUrl || profile?.AvatarImage || profileUrl} alt="update profile avatar" />
                                <span className="flxC">
                                    <FloatingIcon  onClick={pickAvatarImageHandler} name='edit' />
                                    <FloatingIcon onClick={resetAvatarImagePicker} name='restore' />
                                </span>
                                <textarea
                                    className="flx1"
                                    onChange={e => setBio(e.target.value)} label='bio' value={bio} rows='5' />
                                <span className="">
                                    <FloatingIcon onClick={() => setBio(profile?.bio)} name='restore' />
                                </span>

                            </span>

                        </div>
                    </div>
                    <span className="flxC" >
                        <FloatingIcon onClick={pickFeaturedImageHandler} name='edit' />
                        <FloatingIcon onClick={resetFeaturedImagePicker} name='restore' />
                    </span>
                </div>
            </div >
            <button onClick={onSaveHandler}>save</button>
            <LoadingState state={isUpdating} caption='UPDATING PROFILE...' />
        </div>
    )
}

export default UpdateProfileProfile




