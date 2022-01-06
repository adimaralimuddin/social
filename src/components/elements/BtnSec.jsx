function BtnSec(props) {
    return (
        <button
            {...props}
            className=" trans cdark b1s shadow0 p5 plr10 br3 hov-vio-4 hov-cwhite"
        >{props?.children}</button>
    )
}

export default BtnSec
