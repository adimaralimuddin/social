import UserItemGrid from "../../../components/profile/UserItemGrid"

export default function FollowLayout({ follow, options, label }) {
    if (follow) {

        return (
            <div className="p20">
                <div className="white p20 br10 shadow1 flxC itemStart mnh400">
                    <h2>{label || ''}</h2>

                    {
                        follow?.length > 0 ? follow?.map(follower => {
                            return <UserItemGrid options={options} key={follower?.id} data={follower} />
                        })
                            :
                            <div><h3>{label ? `No ${label.toUpperCase()} Yet...` : 'No Data Yet'}</h3></div>
                    }
                </div>
            </div>
        )
    } return <div className="flxC itemStart p20 white br10 mlr20 mnh400">
        <h2>follow</h2>
        <h3 className="light1 mnw200 p20 mt20 br10"></h3>
        <h3 className="light1 mnw100 p20 mt20 br10"></h3>
        <h3 className="light1 mnw150 p20 mt20 br10"></h3>
        <h3 className="light1 mnw100 p20 mt20 br10"></h3>
    </div>
}
