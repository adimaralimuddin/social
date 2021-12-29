

function ListItem(props) {
    return (
        <p ref={props?.ref} {...props} className={"pointer p10 br10 hov-light2 " + props.className}>
            {props?.children}
        </p>
    )
}

export default ListItem
