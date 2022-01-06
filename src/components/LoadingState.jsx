
export default function LoadingState(props) {

    if (props?.state) {
        return <div className="absolute  t0 l0 h100per w100per br10 flxCenter itemCenter ">
            <div className="white p50 br10 shadow b">
                <h2 className="">{props.caption}</h2>
                <lord-icon
                    src="https://cdn.lordicon.com/xjovhxra.json"
                    trigger="loop"
                    colors="primary:#121331,secondary:#08a88a"
                    style={{ width: '100px', height: '100px' }}>
                </lord-icon>
            </div>
        </div>
    } return null;
}