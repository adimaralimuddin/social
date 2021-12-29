
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import postState from '../../../state/feedsState';
import Avatar from '../../others/Avatars'
import PostItemOption from './PostItemOption';
import usePostController from '../../../controller/usePostController'
import CancelIcon from '../../elements/CancelIcon';
import { profileUrl } from '../../../temp';

function PostItem({ data, refocus }) {

    const [post, setPost] = useRecoilState(postState(data?.id))
    const [isEditing, setIsEditing] = useState(false)
    const { lovePost, updatePost } = usePostController()

    useEffect(() => {
        setPost(data)
    }, [data])

    const onLoveHandler = () => lovePost(data)
    const onUpdateHanlder = (body, call) => updatePost({ ...data, body }, call)

    return (
        <div className='white  shadow1 p10'>
            <Header data={post} onEdit={() => setIsEditing(true)} />
            <Body open={!isEditing} data={post} />
            <PostEditor open={isEditing} onCancel={() => setIsEditing(false)} data={post} onUpdate={onUpdateHanlder} />
            <Footer onLove={onLoveHandler} data={post} refocus={refocus} />
        </div>
    )
}

export default PostItem



// PARTS

function Header({ data, onEdit }) {
    const { trashPost } = usePostController();


    function onDeleteHandler() {
        trashPost(data?.id)
    }

    return <header className='flxBetween itemCenter p10 relative '>
        <div className='flx itemCenter'>
            <Avatar url={data?.photoUrl || profileUrl} />
            <p className='ml10'>{data?.userFullName}</p>
        </div>
        <PostItemOption
            onDelete={onDeleteHandler}
            onEdit={onEdit}
        />
    </header>
}

function Body({ data, open = true }) {
    if (open) {
        return <div className='white plr10'>
            <p>{data?.body}</p>
        </div>
    } return null
}

function PostEditor({ data, onUpdate, open, onCancel }) {
    const bodyRef = useRef();
    const [body, setBody] = useState()

    useEffect(() => {
        setBody(data?.body)
        bodyRef.current?.focus()
    }, [data])

    function onUpdateHanlder() {
        onUpdate(body, () => { onCancel(false) })
    }


    if (open) {
        return (
            <div className='flxC relative br20 b2s bOutlined gains mtb10 p10'>
                <textarea className=' br20 flx1 p10 m0 gains noOutline ' value={body} onChange={e => setBody(e.target.value)} ref={bodyRef} name="" id="" cols="30" rows="7">
                </textarea>
                <CancelIcon setter={onCancel} />
                <span className='flx'>
                    <button onClick={onUpdateHanlder}>update</button>
                </span>
            </div>
        )
    } return null
}

function Footer({ data, onLove, refocus }) {

    const [loved, setLoved] = useState(false);

    useEffect(() => {
        if (data?.loves?.find(d => d == data?.userId)) {
            setLoved(true)
        }
    }, [data])

    const onLoveHandler = () => {
        setLoved(s => !s)
        onLove()
    }

    return <footer className='plr10 pt10 flxC '>
        <div className='textLeft'>
            <small >
                loves {data?.loves?.length > 0 ? data?.loves?.length : ''}
            </small>
            <small className='ml10'>shares</small>
            {/* <small className='ml10'>comments {data?.commentCounts > 0 ? data?.commentCounts : ''}</small> */}
            <small className='ml10'>comments {data?.commentlists?.length > 0 ? data?.commentlists?.length : ''}</small>
        </div>
        <div className='flx itemCenter'>
            <ActionButton onClick={onLoveHandler} stateOption={loved ? 'cRed' : 'cGray'} icon={loved ? 'favorite' : 'favorite_border'}></ActionButton>
            <ActionButton onClick={refocus} icon='chat_bubble_outline'></ActionButton>
            <ActionButton icon='send'></ActionButton>
        </div>
    </footer>
}

function ActionButton(props) {
    return <span className='flx p5 br5 pointer'>
        <span onClick={props?.onClick} className={"material-icons hov-cblue1 hov-enlarge " + props?.stateOption}>
            {props?.icon}
        </span>
        <p className='ml5 '>{props?.children}</p>
    </span>
}