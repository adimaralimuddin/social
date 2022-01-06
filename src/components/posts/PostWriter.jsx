import { useEffect, useRef, useState } from "react"
import create from 'zustand'
import { persist } from "zustand/middleware";
import usePosts from "../../firebase/usePosts";

// const store_ = set => ({
//     postWriterImage: [],
//     postWriterImageUrls: [],
//     clearImages: () => set({ postWriterImage: [], postWriterImageUrls: [] }),
//     set: func => set(func)
// })
// export const postWriterStore = create(persist(store_))


function PostWriter() {
    const [image, setImage] = useState([])
    return <Writer images={{ val: image, set: setImage }} />
}

export function Writer({ images }) {

    const body = useRef();
    const { add } = usePosts()
    const inputImage = useRef();


    const onImageInput = ({ target }) => {
        if (target.files && target.files.length == 1) {
            const reader = new FileReader()
            reader.onload = () => images.set(p => [...p, { file: target.files[0], url: reader.result }])
            reader.readAsDataURL(target.files[0])
        }
    }

    const onPostHander = () => { add({ body: body.current.value }, { images }); body.current.value = '' }

    return (
        <div className="flxC white shadow1 br10 p20  mb20 w100per  ">
            <textarea ref={body} className="br10  p10" name="" id="" cols="30" rows="5"></textarea>
            <Images images={images} />
            <footer className="flxBetween itemCenter">
                <input onChange={onImageInput} ref={inputImage} type="file" className="hide" />
                <span onClick={() => { inputImage?.current.click() }} className="material-icons fs30 hov-cdark-1 cdark2 pointer hov-enlarge"> image </span>
                <button onClick={onPostHander}>Post</button>
            </footer>
        </div>
    )
}

export default PostWriter

function Images({ images }) {

    if (images?.val && images.val?.length > 0) {
        return (
            <div className="flx wrap scroll mxh300">
                {
                    images.val.map(image => <ImageItem key={Math.random()} image={image} images={images} />)
                }
            </div>
        )
    }
    return null;
}


function ImageItem({ images, image, }) {

    const [showOption, setShowOption] = useState(false);
    const onRemoveImageHandler = () => images.set(p => p.filter(img => img.url != image.url))

    return (
        <div
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
            className="m br10 shadow1 b pointer p0 hov-jump flxC">
            {
                showOption && <span className="relative flxC">
                    <span onClick={onRemoveImageHandler} className="flx1 material-icons fs30 absolute r5 white cdark t10 cwhite p0 hov-enlarge  br90per">
                        close
                    </span>
                </span>
            }
            <img src={image.url} alt="image input" className="mxw200 br10 mxh150 flx1" />
        </div>
    )
}

