

function DisplayValue({ value, label, separator }) {
    if (value) {
        return (
            <div>
                <p>{label} {separator || ':'} {value}</p>
            </div>
        )
    } return null;
}

export default DisplayValue
