

export default function CancelIcon(props) {
    const { setter } = props
    return <span {...props} onClick={setter} className="absolute t-10 l-10 material-icons cRed white br90per p3 shadow1 b pointer hov-enlarge">
        close
    </span>
}