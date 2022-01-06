
function FloatingIcon(props) {
    return (
        <span {...props} className="material-icons r10 t10 hov-enlarge white pointer p5 br20 shadow1 b" >
            {props?.name}
        </span >
    )
}

export default FloatingIcon
