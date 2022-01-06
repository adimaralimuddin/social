import { useEffect, useRef } from "react"


function Input(props) {

    const labelRef = useRef();
    const labelText = props?.label || ''

    function onFocusHandler({ target }) {
        target.placeholder = ''
        labelRef.current.textContent = labelText
    }

    function onBLurHandler({ target }) {
        target.placeholder = labelText
        if (!target.value) {
            labelRef.current.textContent = ''
        }
    }

    return (
        <div className={"flxC mtb20 m mnw100 relative " + props?.className} >
            <label ref={labelRef} htmlFor="" className="ml5 trans absolute t-20">
                {/* {labelText} */}
            </label>
            <input
                {...props}
                value={props.value}
                type="text"
                className="gains br gains"
                placeholder={labelText}
                onFocus={onFocusHandler}
                onBlur={onBLurHandler}
            />
        </div>
    )
}

export default Input
