

export default function SearchInput(props) {
    return (
        <div className="flx itemCenter gains br20 pr10">
            <input {...props} type="text" className="gains br20 noOutline " placeholder="search..." />
            <span className="material-icons m">
                search
            </span>
        </div>
    )
}
