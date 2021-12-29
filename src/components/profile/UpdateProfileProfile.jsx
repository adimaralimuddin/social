import { useState } from "react";
import { useEffect, useRef } from "react/cjs/react.development";
import { updateProfileProfileState } from "../../state/userState";
import { featuredUrl, profileUrl } from "../../temp"
import FloatingIcon from "../elements/FloatingIcon"
import Input from "../elements/Input"
import shallow from 'zustand/shallow'

function UpdateProfileProfile() {

    const state = updateProfileProfileState(state => state)

    const [featuredImageUrl, setFeaturedImageUrl] = useState();
    const [avatarImageUrl, setAvatarImageUrl] = useState();

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

    useEffect(() => {
        viewFeauredImageUrl()
        viewAvatarImageUrl()
    }, [state.featuredImageFile, state.avatarImageFile])

    return (
        <>
            <input style={{ display: 'none' }} ref={featureImagePickerRef} onChange={featuredImageFilePicker} type="file" />
            <input style={{ display: 'none' }} ref={AvatarImagePickerRef} onChange={avatarImageFilePicker} type="file" />

            <h2>Profile</h2>
            <div className="flxC br10 br10 shadow1 hidden b relative">
                <img ref={imgViewer} className="mnh150 mxh150 bb" src={featuredImageUrl || featuredUrl} alt="update profile featured image" />
                <FloatingIcon onClick={pickFeaturedImageHandler} name='edit' />
                <span className="relative">
                    <div className="absolute t-50 l50">
                        <FloatingIcon onClick={pickAvatarImageHandler} name='edit' />
                        <img
                            className="  mnh100 mnw100 br90per mxw100 mxh100 gains b shadow1"
                            src={avatarImageUrl || profileUrl} alt="update profile avatar" />
                    </div>
                </span>
                <div className="flx wrap">
                    <span className="mnw150"></span>
                    <Input label='bio' />
                </div>
            </div>
        </>
    )
}

export default UpdateProfileProfile

export function Stupid() {
    const [] = useState();
    return 'ji'
}

