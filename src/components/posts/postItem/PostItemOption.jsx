import { useState } from "react"


function PostItemOption({ onDelete, onEdit, }) {

    const [open, setOpen] = useState(false);

    const onEdiitHandler = () => {
        onEdit()
        setOpen(false)
    }

    return (
        <div>
            <span onClick={() => setOpen(s => !s)} className="material-icons pointer hov-enlarge">
                more_horiz
            </span>
            {
                open &&
                <div onMouseLeave={() => setOpen(false)} className="front absolute t10 r0 p30 flxC mnw250">
                    <div className="flxC p10 shadow1 b white br10">
                        <button>share</button>
                        <button onClick={onEdiitHandler}>edit</button>
                        <button onClick={onDelete}>delte</button>
                    </div>
                </div>
            }
        </div >
    )
    // } else return null
}

export default PostItemOption
