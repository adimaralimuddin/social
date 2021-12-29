import { useState } from "react"
import { findAllInRenderedTree } from "react-dom/cjs/react-dom-test-utils.development"
import Avatars from "../others/Avatars"


function UserItemGrid({ data, options }) {

    const [showOption, setShowOption] = useState(false)
    const [showOptionPop, setShowOptionPop] = useState(false)

    return (
        <div
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
            className="white p br10 mtb10 hov-light pointer">
            <header className="flxBetween itemCenter ">
                <div className="flx itemCenter">
                    <Avatars url={data?.photoUrl} />
                    <h3 className="mlr10">{data?.fullName}</h3>
                </div>
                <div className="relative itemCenter flx">
                    {
                        showOption &&
                        <span onClick={() => setShowOptionPop(true)} className="material-icons pointer hov-enlarge">
                            more_horiz
                        </span>
                    }
                    <OptionPop data={data} options={options} open={showOptionPop} onMouseLeave={() => setShowOptionPop(false)} />
                </div>
            </header>
            <div>

            </div>
        </div>
    )
}

export default UserItemGrid

function OptionPop({ data, open, options, onMouseLeave }) {
    if (open) {
        return (
            <div className="pt40 absolute t-10 r0 " onMouseLeave={onMouseLeave}>
                <div className=" b white p10 shadow1 br10 mnw100 mnh100" >
                    {
                        options?.map(op => {
                            return <button key={op?.label || Math.random() * 2} onClick={() => op?.method(data)}>{op?.label}</button>
                        })
                    }
                </div>
            </div>
        )
    } return null
}
