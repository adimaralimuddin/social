import BtnPrime from "../elements/BtnPrime"
import { useRef } from "react"

function PostWriter({ onPost }) {
    const body = useRef();

    function onPostHander() {

        onPost({
            body: body.current.value
        })
    }

    return (
        <div className="flxC white shadow1 br10 p0 ">
            <textarea ref={body} className="br10 m0" name="" id="" cols="30" rows="5"></textarea>
            <footer className="flx p10">
                <BtnPrime onClick={onPostHander}>post</BtnPrime>
            </footer>
        </div>
    )
}

export default PostWriter
