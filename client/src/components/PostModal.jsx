import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { format } from 'timeago.js'
import { Favorite, FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'
import { Modal, Box as ModalBox } from '@mui/material'
import UserModal from './UserModal'
import {
    Flex,
    Box,
    Image,
    PostTop,
    PostCenter,
    PostBottom,
    ProfileImg,
    ProfileName,
    BlueTick,
    CommentBox,
    InnerBox
} from '../styles/PostModal'
import {
    Wrapper,
    Text,
    PostBottom as Bottom,
    Input,
    Span
} from '../styles/Post'
import { Box as MUIBox, CircularProgress } from '@mui/material'
import { Close } from '@mui/icons-material'
import {
    addComment,
    getPost,
    likePost,
    deleteComment
} from '../redux/apiCalls'
import { userRequest } from '../requestMethods'

const PostModal = ({ postId }) => {
    const dispatch = useDispatch()
    const comment = useRef()
    const [open, setOpen] = useState(false)
    const { currentUser } = useSelector(state => state.user)
    const { isLoading, post, error, loadingLike, loadingComment } = useSelector(state => state.post)

    const handleClose = () => setOpen(false)

    useEffect(() => {
        getPost(dispatch, postId)
    }, [postId])

    const handleLike = () => {
        const postId = post._id
        likePost(dispatch, postId, {
            userId: currentUser._id,
            token: currentUser.accessToken
        })
    }

    const handleComment = async () => {
        const postId = post._id
        await addComment(dispatch, postId, {
            author: currentUser._id,
            body: comment.current.value,
            token: currentUser.accessToken
        })
        comment.current.value = ''
    }

    const handleDelete = (id) => {
        const postId = post._id
        deleteComment(dispatch, postId, id, {
            token: currentUser.accessToken
        })
    }

    const handlePostDelete = async () => {
        await userRequest.delete(`/posts/${post._id}`, {
            token: currentUser.accessToken
        })
        window.location.reload()
    }

    return (
        <Flex>
            {isLoading ? <MUIBox className='loader big-loader'>
                <CircularProgress />
            </MUIBox> : error ? <h2>Something went wrong</h2> : <>
                <Box img>
                    <Image src={post.image} />
                </Box>
                <Box>
                    <PostTop>
                        <Link>
                            <ProfileImg
                                img={post.author?.profileImg ? post.author?.profileImg : '../images/avatar.png'}
                            />
                        </Link>

                        <Link className='link'>
                            <ProfileName absolute>
                                {post.author?.username}
                            </ProfileName>
                            {post.author?.isCelebrity && <BlueTick src='/images/bluetick.PNG' />}
                        </Link>
                    </PostTop>

                    <PostCenter>
                        {post.caption && (
                            <CommentBox style={{ borderBottom: '1px solid #dbdbdb' }}>
                                <CommentBox>
                                    <Link to={`/profile/${post.author?._id}`}>
                                        <ProfileImg img={post.profileImg ? post.profileImg : '../images/avatar.png'} />
                                    </Link>
                                    <InnerBox>
                                        <Link to={`/profile/${post.author?._id}`} className='link'>
                                            <ProfileName>{post.author?.username}</ProfileName>
                                        </Link>
                                        {' '}
                                        <span style={{ fontSize: '0.8rem' }}>
                                            {post.caption}
                                        </span>
                                        <div style={{ color: '#8e8e8e' }}>
                                            {post.createdAt.toString().substr(0, 10)}
                                        </div>
                                    </InnerBox>
                                </CommentBox>
                            </CommentBox>
                        )}
                        {post.comments?.length === 0 ? <h2 className='notice'>
                            No comments yet
                        </h2> : <>
                            {post?.comments?.map(comment => (
                                <CommentBox comment key={comment._id}>
                                    <Link
                                        to={`/profile/${comment.author?._id}`}
                                        onClick={handleClose}
                                    >
                                        <ProfileImg img={comment.author?.profileImg ? comment.author?.profileImg : '/images/avatar.PNG'} />
                                    </Link>
                                    <InnerBox>
                                        <Link
                                            className='link'
                                            onClick={handleClose}
                                            to={`/profile/${comment.author?._id}`}
                                        >
                                            <ProfileName>{comment.author?.username}</ProfileName>
                                            {comment.author?.isCelebrity && (
                                                <BlueTick none src='/images/bluetick.PNG' style={{
                                                    margin: '0 5px',
                                                    paddingTop: '7px'
                                                }} />
                                            )}
                                        </Link>
                                        {' '}
                                        <span style={{ fontSize: '0.8rem' }}>
                                            {comment.body}
                                        </span>
                                        <div style={{ display: 'flex', gap: '20px' }}>
                                            <span style={{ color: '#8e8e8e' }}>
                                                {comment.createdAt.toString().substr(0, 10)}
                                            </span>
                                            {comment.author?._id === currentUser._id && <>
                                                <span
                                                    style={{
                                                        color: 'red',
                                                        fontWeight: '600',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => handleDelete(comment._id)}
                                                >Delete comment</span>
                                                {(comment.author?._id === currentUser._id && loadingComment) && <CircularProgress />}
                                            </>}
                                        </div>
                                    </InnerBox>
                                </CommentBox>
                            ))}
                        </>}
                    </PostCenter>

                    <PostBottom>
                        <Wrapper>
                            {loadingLike ? <CircularProgress /> : <>
                                {(post.likes?.find(like => like._id === currentUser._id) || post.likes?.includes(currentUser._id)) ? (
                                    <Favorite style={{ color: '#DB565B' }} className='icon' onClick={handleLike} />
                                ) : (
                                    <FavoriteBorder className='icon' onClick={handleLike} />
                                )}
                            </>}
                            <ChatBubbleOutline className='icon' />

                            <Text
                                onClick={() => setOpen(true)}
                                margin
                                style={{ fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' }}
                            >
                                {post.likes?.length} likes
                            </Text>
                            {post.author?._id === currentUser._id && <span
                                style={{
                                    color: 'red',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                                onClick={handlePostDelete}
                            >Delete post</span>}
                            <Text margin date gray>{post.createdAt?.toString().substr(0, 10)}</Text>
                        </Wrapper>

                        <Bottom>
                            <Input ref={comment} type='text' placeholder='Add a comment...' />
                            {loadingComment && <CircularProgress />}
                            <Span onClick={handleComment}>Post</Span>
                        </Bottom>
                    </PostBottom>
                </Box>
            </>}

            <Modal open={open} onClose={handleClose}>
                <ModalBox className='user-modal'>
                    <Close className='close-button' onClick={handleClose} />
                    <UserModal data={post.likes} dataType='Likes' />
                </ModalBox>
            </Modal>
        </Flex >
    )
}

export default PostModal