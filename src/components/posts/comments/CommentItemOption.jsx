import { useState } from "react"


function CommentItemOption({ onDelete, display }) {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(s => !s)
    if (display) {

        return (
            <div className="relative">
                <span onClick={toggle} className="material-icons pointer">
                more_horiz
            </span>
                {
            open && (
                <div onMouseLeave={toggle} className="absolute t0 r0 pt30">
                    <div className="white p br10 shadow1 b ">
                        <button onClick={onDelete}>delete</button>
                    </div>
                </div>
            )
        }
            </div >
        )
    }

    return null;
}

export default CommentItemOption
