

function BtnPrime(props) {
    const style = `br10 p7 plr20 purple1`
    return (
        <button {...props} className={style}>{props.children}</button>
    )
}

export default BtnPrime
