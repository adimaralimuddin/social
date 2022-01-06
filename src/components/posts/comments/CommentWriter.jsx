import { useEffect, useRef, useState } from "react"
import CancelIcon from "../../elements/CancelIcon";

function CommentWriter({
    onChange,
    onPost,
    onClose,
    focus,
    showReplyWriter,
    refocus,
    tryFocus
}) {

    const [open, setOpen] = useState(true);
    const [cols, setCols] = useState()
    const [rows, setRows] = useState(1)
    const bodyRef = useRef()

    useEffect(() => {
        focus && bodyRef.current?.focus()
        refocus && refocus(bodyRef.current)
    }, [])

    useEffect(() => {
        if (tryFocus) {
            bodyRef.current?.focus()
        }
    }, [tryFocus])

    function onChangeHandler() {

    }

    function onPostHandler() {
        onClose && onClose(false)
        onPost(bodyRef.current?.value)
    }

    function onBlurHandler() {
        !focus && setRows(1)
        // showReplyWriter(false)
    }

    return (
        <div className="flx wrap" >
            {
                focus &&
                <div className="relative">
                    <CancelIcon setter={() => showReplyWriter(false)} />
                </div>
            }
            <textarea

                ref={bodyRef}
                onFocus={() => setRows(5)}
                onBlur={onBlurHandler}
                onChange={onChangeHandler}
                name="" id="" cols="30" rows={rows}
                className="flx1 gains m0 br10 p20 mnw200"
                draggable={false}
            ></textarea>
            <span className="flxC">
                <button onClick={onPostHandler}>post</button>
            </span>
        </div>
    )

}



export default CommentWriter
