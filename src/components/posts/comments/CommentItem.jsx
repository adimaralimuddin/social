import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import useCommentController from "../../../controller/useCommentController"
import commentState from "../../../state/commentState"
import { selectedProfileUidState } from "../../../state/userState"
import ChangerTest from "../../../tester/ChangerTest"
import Avatars from "../../others/Avatars"
import CommentItemOption from "./CommentItemOption"
import CommentWriter from "./CommentWriter"

function CommentItem({ data, setWriteReply }) {

    // console.log({ data });
    const [showOption, setShowOption] = useState(false)
    const [comment, setComment] = useRecoilState(commentState(data?.id))
    const { trashComment, loveComment, postComment } = useCommentController();

    useEffect(() => {
        setComment(data)
    }, [])

    const onDeleteHandler = () => trashComment(data)
    const onLoveHandler = () => loveComment(data)


    return (
        <div
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
            className="flxC ">
            <div className="textLeft">
                <Header data={data} />
            </div>
            {/* <ChangerTest field='body' setter={setComment} /> */}
            <div className="flx flx1  itemCenter">
                <Body onLove={onLoveHandler} data={comment} />
                <CommentItemOption display={showOption} onDelete={onDeleteHandler} />

            </div>
            <div className="relative">

                <Actions
                    onLove={onLoveHandler}
                    data={comment}
                    open={showOption}
                    onClose={setShowOption}
                    onWriteReply={setWriteReply}
                />
            </div>
        </div>
    )
}

export default CommentItem

function Actions({ data, open, onLove, onClose, onWriteReply }) {
    const style = ` material-icons pointer hov-enlarge`
    const [loved, setLoved] = useState();

    useEffect(() => {
        if (data?.loves?.find(d => d == data?.userId)) {
            setLoved(true)
        } else {
            setLoved(false)
        }
    }, [data])

    const onLoveHandler = () => {
        onLove()
        setLoved(s => !s)
    }

    const onWriteReplyHandler = () => {
        onClose(false)
        onWriteReply(true)
    }

    if (open) {
        return <div className="absolute b-40 l0 p10 br10 shadow1 white flx front">
            <span onClick={onLoveHandler} className={`${loved ? 'cRed' : 'cGray'}` + style}>
                {loved ? 'favorite' : 'favorite_border'}
            </span>
            <span onClick={onWriteReplyHandler} className={style}>
                chat_bubble_outline
            </span>
        </div>
    } return null
}


function Header({ data }) {
    const set = selectedProfileUidState(state => state.set)

    function onSelect() {
        set({ uid: 'IbEZzZgVRcPGSofrv2cWQ8BpLkn1' })
    }
    return <div className="flx itemCenter">
        <Link to='/profile' onClick={onSelect}>
            <Avatars url={data?.AvatarImage} />
        </Link>
        <p className="mlr10">{data?.fullName}</p>
    </div>
}


function Body({ data, onMouseLeave, onMouseEnter }) {


    return <div
        className="p10 br m flx itemCenter pointer  mnw150"
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
    >
        <p className="hidden word-wrap">{data?.body}</p>
    </div>
}

