import { useState } from "react"


function PostItemOption({ onDelete, onEdit, }) {

    const [open, setOpen] = useState(false);

    const onEdiitHandler = () => {
        onEdit()
        setOpen(false)
    }

    return (
        <div >
            <span onClick={() => setOpen(s => !s)} className="material-icons pointer hov-enlarge">
                more_horiz
            </span>
            {
                open &&
                <div className="relative">
                    <div onMouseLeave={() => setOpen(false)} className="front absolute t-40 r-10 p30 flxC mnw250">
                        <div className="flxC p10 shadow1 b white br10">
                            <button className="trans shadow0 cdark1 hov-dark8" onClick={onEdiitHandler}>edit</button>
                            <button className="trans shadow0 cdark1 hov-dark8" onClick={onDelete}>delete</button>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
    // } else return null
}

export default PostItemOption
