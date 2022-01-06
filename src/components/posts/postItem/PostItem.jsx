
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import postState from '../../../state/feedsState';
import Avatar from '../../others/Avatars'
import PostItemOption from './PostItemOption';
import usePostController from '../../../controller/usePostController'
import CancelIcon from '../../elements/CancelIcon';
import { profileUrl } from '../../../temp';
import usePosts from '../../../firebase/usePosts';
import reactDom from 'react-dom';
import PostComment from '../comments/PostComment';

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
        <div className='white  shadow1 back '>
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
    // console.log('avatar: ', data?.photoUrl);
    const { trashPost } = usePostController();

    function onDeleteHandler() {
        trashPost(data)
    }

    return <header className='flxBetween itemCenter p10'>
        <div className='flx itemCenter'>
            <Avatar url={data?.AvatarImage || data?.photoUrl || profileUrl} />
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
        return <div className='white '>
            <p className='p20'>{data?.body}</p>
            <Images data={data} />
        </div>
    } return null
}

function Images({ data }) {

    const [showImageViewer, setShowImageViewer] = useState(false)
    const [selectedInd, setSelectedInd] = useState(null)
    function onSelectHandler(image) {
        const img = data?.imagesUrls.indexOf(image)
        setSelectedInd(img)
        setShowImageViewer(true)
    }

    if (data?.imagesUrls) {
        var images = data?.imagesUrls
        return (
            <div className='wrap images-grid'>
                {
                    images?.map((image, ind) => {
                        if (ind < 6) {
                            return <Image key={image} onSelect={onSelectHandler} image={image} ind={ind} length={images?.length} />
                        }
                    })
                }
                {showImageViewer && <PostImageViewer selectedInd={selectedInd} post={data} onClose={() => setShowImageViewer(false)} />}

            </div>
        )
    }
    if (data?.images > 0) {
        return <div>
            <lord-icon
                src="https://cdn.lordicon.com/xjovhxra.json"
                trigger="loop"
                colors="primary:#121331,secondary:#08a88a"
                className='w50 h50'
            >
            </lord-icon>
        </div>
    }
    return null
}

function Image({ image, ind, length, onSelect }) {

    function onClickHandler() {
        onSelect(image)
    }

    return (
        <div className='mnh100 mnw100  flxC br10 m1   '>
            <img onClick={onClickHandler} src={image?.url || image} alt="image" className='flx1 w100per pointer  mnw100 hov-dark8 mnh100' />
            {
                ind == 5 && length > 6 && <div className='flxCenter'>
                    <p className='fs20 hov-fly hov-cdark-7 pointer '>{length - 6}+ more</p >
                </div>
            }
        </div>
    )
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
function PostImageViewer({ post, onClose, selectedInd }) {


    const [urlInd, setUrlInd] = useState(0);
    const [isEditing, setIsEditing] = useState(false)
    const [commentFoc, setCommentFoc] = useState(false)

    useEffect(() => {
        if (selectedInd) {
            setUrlInd(selectedInd)
        }
    }, [selectedInd])

    const { lovePost, updatePost } = usePostController()

    const urls = post?.imagesUrls
    console.log('url ind: ', urls[urlInd]);
    console.log('post', post);

    const next = () => urlInd < urls.length && setUrlInd(p => p + 1)
    const prev = () => urlInd > 0 && setUrlInd(p => p - 1)

    const onUpdateHanlder = (body, call) => updatePost({ ...post, body }, call)



    return reactDom.createPortal(
        <div className='fixed t0 l0 h100per w100per flxCenter itemCenter p20 gains '>
            <div className='flx br10 h100per w100per mxw1000 shadow1 hidden wrap scroll'>
                <span onClick={onClose} class="material-icons absolute p5 pointer hov-light9 hov-enlarge br90per b">
                    close
                </span>
                <div
                    className='flx2 gains flxBetween mnw300 mnh400 dark8 p10 h100per'>
                    <span className='mxw50 flxCCenter itemCenter mnw30'>
                        {urlInd > 0 &&
                            <span onClick={prev} class=" material-icons white p pointer b p5 br90per hov-enlarge"> arrow_back_ios</span>
                        }
                        <p>{urlInd == 0 ? '' : urls.length + (urlInd - urls.length) + ' lest'}</p>
                    </span>
                    <div className='flxCenter itemCenter'>
                        <img src={urls[urlInd].url} alt="" className='flx1 w100per' />
                    </div>
                    <span className='mxw50 flxCCenter itemCenter mnw30'>
                        {
                            urlInd < (urls.length - 1) &&
                            <span onClick={next} class=" material-icons white pointer b p5 br90per hov-enlarge"> arrow_forward_ios</span>
                        }
                        <p>{urls.length - urlInd == 0 ? '' : (urls.length - (urlInd + 1)) == 0 ? '' : (urls.length - (urlInd + 1)) + ' more'}</p>
                    </span>
                </div>
                <div className='br20 white  gridautox1 flx1 mnw250 '>
                    <div className='p10 '>
                        <Header data={post} onEdit={() => setIsEditing(true)} />
                        <PostEditor open={isEditing} onCancel={() => setIsEditing(false)} data={post} onUpdate={onUpdateHanlder} />
                        <p className='plr20 p10'>{post?.body}</p>
                        <Footer onLove={() => lovePost(post)} data={post} refocus={() => commentFoc?.focus()} />
                    </div>
                    <div className='flx1 flxC scrollY mnw200 br10 '>
                        <PostComment refocus={(ref) => setCommentFoc(ref)} data={post} />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}