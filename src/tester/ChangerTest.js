

function ChangerTest({ setter, field }) {

    const val = Math.round(Math.random() * 100)

    return (
        <div>
            <button onClick={() => setter(s => ({ ...s, [field]: val }))}>change test</button>
        </div>
    )
}

export default ChangerTest
