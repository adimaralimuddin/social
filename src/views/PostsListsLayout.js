
import PostLayout from './PostLayout'

function PostsListsLayout({ data }) {

    if (data) {
        if (data && data.length > 0) {
            return (
                <div>
                    {data && data.map(p => <PostLayout key={p.id} data={p} />)}
                </div>
            )
        } return <div className="white p br10 mnh100 shadow1 flxCenter itemCenter">
            <h3>No Post Yet!</h3>
        </div>
    }
    return (
        <div className="mxw500 w100per">
            <div className="mnh200 white br10 p20 m shadow1">
                <header className="flx itemCenter">
                    <div className="p25 br90per dark8"></div>
                    <div className="p15 mnw200 dark8 ml20"></div>
                </header>
                <div>
                    <div className="mnh100 mt20 br10 dark8">

                    </div>
                </div>
            </div>
        </div>
    )


}

export default PostsListsLayout
