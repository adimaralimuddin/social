import { useEffect, useRef, useState } from "react"
import CancelIcon from "../../elements/CancelIcon";

function CommentWriter({
    onChange,
    onPost,
    onClose,
    focus,
    showReplyWriter,
    refocus
}) {

    const [open, setOpen] = useState(true);
    const [cols, setCols] = useState()
    const [rows, setRows] = useState(1)
    const bodyRef = useRef()

    useEffect(() => {
        focus && bodyRef.current?.focus()
        refocus && refocus(bodyRef.current)
    }, [])

    function onChangeHandler() {

    }

    function onPostHandler() {
        onClose && onClose(false)
        onPost(bodyRef.current?.value)
    }


    return (
        <div className="flx relative" >
            <textarea

                ref={bodyRef}
                onFocus={() => setRows(5)}
                onBlur={() => !focus && setRows(1)}
                onChange={onChangeHandler}
                name="" id="" cols="30" rows={rows}
                className="flx1 m0 br10 p20 mnw100"
            ></textarea>
            <span className="flxC">
                <button onClick={onPostHandler}>post</button>
                {
                    focus && <CancelIcon setter={() => showReplyWriter(false)} />
                }
            </span>
        </div>
    )

}



export default CommentWriter
