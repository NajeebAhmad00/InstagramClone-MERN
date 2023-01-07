import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Favorite, FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'
import {
    Box,
    PostTop,
    ProfileImage,
    ProfileName,
    PostTopR,
    PostCenter,
    PostCenterImg,
    Wrapper,
    Text,
    PostBottom,
    Input,
    Span
} from '../styles/Post'
import { CircularProgress, Modal } from '@mui/material'
import PostModal from './PostModal'
import UserModal from './UserModal'
import { useDispatch, useSelector } from 'react-redux'
import { addComments, likePosts } from '../redux/apiCalls'

const Post = ({ post }) => {
    const dispatch = useDispatch()
    const comment = useRef()
    const [open, setOpen] = useState(false)
    const [width, setWidth] = useState('40%')
    const [userModal, setUserModal] = useState(false)

    const { currentUser } = useSelector(state => state.user)
    const { loadingLike } = useSelector(state => state.post)

    const handleClose = () => {
        setOpen(false)
        setWidth('40%')
    }

    const handleModalClose = () => setUserModal(false)

    const handleLike = (id) => {
        try {
            likePosts(dispatch, id, {
                userId: currentUser._id,
                token: currentUser.accessToken
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleComment = async () => {
        const postId = post._id
        try {
            await addComments(dispatch, postId, {
                author: currentUser._id,
                body: comment.current.value,
                token: currentUser.accessToken
            })
            comment.current.value = ''
            setOpen(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Box width={width}>
            <PostTop>
                <Link to={`/profile/${post.author?._id}`}>
                    <ProfileImage profile={post.author?.profileImg ? post.author?.profileImg : '/images/avatar.PNG'} />
                </Link>
                <Link className='link' to={`/profile/${post.author?._id}`}>
                    <ProfileName>{post.author?.username}</ProfileName>
                </Link>
                {/* <PostTopR>
                    <i className='fa-solid fa-ellipsis' style={{ fontSize: '1.6rem' }}></i>
                </PostTopR> */}
            </PostTop>

            <PostCenter>
                <PostCenterImg src={post.image} />
                <Wrapper>
                    {loadingLike ? <CircularProgress /> : <>
                        {(post.likes?.find(like => like._id === currentUser._id) || post.likes?.includes(currentUser._id)) ? (
                            <Favorite onClick={() => handleLike(post._id)} style={{ color: '#DB565B' }} className='icon' />
                        ) : (
                            <FavoriteBorder onClick={() => handleLike(post._id)} className='icon' />
                        )}
                    </>}
                    <ChatBubbleOutline className='icon' />
                    <Text
                        onClick={() => setUserModal(true)}
                        margin
                        style={{ fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', marginLeft: '10px' }}
                    >
                        {post.likes?.length} likes
                    </Text>
                    <Text>
                        <Link to={`/profile/${post.author?._id}`} className='link'>
                            <ProfileName>{post.author?.username}</ProfileName>
                        </Link>
                        {' '}
                        {post.caption}
                    </Text>
                    <Text comment gray pointer onClick={() => {
                        setOpen(true)
                        setWidth('70%')
                    }}>
                        {post.comment?.length === 0 ? 'No comments yet' : `View all ${post.comments?.length} comments`}
                    </Text>
                    <Text date gray>{post.createdAt.toString().substr(0, 10)}</Text>
                </Wrapper>
            </PostCenter>

            <PostBottom>
                <Input ref={comment} type='text' placeholder='Add a comment...' />
                <Span onClick={handleComment}>Post</Span>
            </PostBottom>

            <Modal open={open} onClose={handleClose}>
                <Box className='post-modal'>
                    <PostModal postId={post._id} />
                </Box>
            </Modal>

            <Modal open={userModal} onClose={handleModalClose}>
                <Box className='user-modal'>
                    <UserModal data={post.likes} dataType='Likes' />
                </Box>
            </Modal>
        </Box>
    )
}

export default Post