
import UserItemGrid from "../../../components/profile/UserItemGrid"

export default function FollowLayout({ follow, options, label }) {
    console.log({ follow });
    if (follow) {
        return (
            <div className="p20">
                <div className="white p20 br10 shadow1 flxC itemStart trans-pop mnh200 ">
                    <h2>{label || ''}</h2>
                    {
                        follow?.length > 0 ? follow?.map(follower => {
                            return <UserItemGrid key={follower?.uid || follower?.id} options={options} data={follower} />
                        })
                            :
                            <div className="flxCenter itemCenter flx1 w100per">
                                <h3>{label ? `No ${label} Yet...` : 'No Data Yet'}</h3>
                            </div>
                    }
                </div>
            </div>
        )
    }
    return (
        <div className="flxCenter itemCenter shadow1 p20 white br10  mnh200 m20 trans-pop">
            <h3>No {label} Yet...</h3>
        </div>
    )

}
