import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress, Modal } from '@mui/material'
import Navbar from '../components/Navbar'
import UserModal from '../components/UserModal'
import PostModal from '../components/PostModal'
import {
    Container,
    ProfileInfo,
    ProfileImg,
    Info,
    InfoContainer,
    ProfileName,
    Button,
    Text,
    Span,
    GalleryBox,
    Image,
    ImageBox,
    BlueTick
} from '../styles/Profile'
import {
    followUser,
    getUser,
    getPosts
} from '../redux/apiCalls'
import { logout } from '../redux/userRedux'
import { LinkedIn, Facebook } from '@mui/icons-material'

const Profile = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [postModal, setPostModal] = useState(false)
    const [modalData, setModalData] = useState('')
    const [dataType, setDataType] = useState('')
    const [postId, setPostId] = useState('')
    const userId = location.pathname.split('/')[2]
    const { currentUser, isFetching, oneUser, isLoading } = useSelector(state => state.user)
    const { isFetching: postsFetching, posts, error } = useSelector(state => state.post)

    useEffect(() => {
        getUser(dispatch, userId)
        getPosts(dispatch, userId)
    }, [userId])

    const handleClose = () => setOpen(false)
    const handlePostClose = () => setPostModal(false)

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    const handleFollow = (e) => {
        e.preventDefault()
        const id = oneUser._id
        const userId = currentUser._id
        followUser(dispatch, id, { userId })
    }

    return (
        <>
            <Navbar />

            {isFetching ? <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <CircularProgress />
            </Box> : (
                <Container>
                    <ProfileInfo>
                        <ProfileImg src={oneUser.profileImg ? oneUser.profileImg : '../images/avatar.png'} />

                        <Info>
                            <InfoContainer>
                                <ProfileName>{oneUser.username}</ProfileName>
                                {oneUser.isCelebrity && <BlueTick src='/images/bluetick.PNG' />}
                                {isLoading ? <CircularProgress /> : (
                                    <>
                                        {userId === currentUser._id ? (
                                            <Link to='/editprofile'>
                                                <Button white>Edit profile</Button>
                                            </Link>
                                        ) : (
                                            (currentUser.following?.includes(oneUser._id) || oneUser.followers?.find(user => user._id === currentUser._id)) ? (
                                                <Button white onClick={handleFollow}>Unfollow</Button>
                                            ) : (
                                                <Button onClick={handleFollow}>Follow</Button>
                                            )
                                        )}
                                    </>
                                )}
                            </InfoContainer>
                            <InfoContainer marginTop>
                                <Text><Span>{posts.length}</Span> posts</Text>
                                <Text pointer onClick={() => {
                                    setOpen(true)
                                    setModalData(oneUser.followers)
                                    setDataType('Followers')
                                }}><Span>{oneUser.followers?.length}</Span> followers</Text>
                                <Text pointer onClick={() => {
                                    setOpen(true)
                                    setDataType('Following')
                                    setModalData(oneUser.following)
                                }}><Span>{oneUser.following?.length}</Span> following</Text>
                            </InfoContainer>
                            <InfoContainer marginTop column>
                                <Span name>{oneUser.fullName}</Span>
                                <Text>
                                    {oneUser.linkedIn && oneUser.linkedIn !== '' && (
                                        <a className='link' href={oneUser.linkedIn} target='_blank'>
                                            <LinkedIn className='icon' />
                                        </a>
                                    )}
                                    {oneUser.facebook && oneUser.facebook !== '' && (
                                        <a className='link' href={oneUser.facebook} target='_blank'>
                                            <Facebook className='icon' />
                                        </a>
                                    )}
                                </Text>
                                {oneUser.bio && (
                                    <Text>
                                        {oneUser.bio}
                                    </Text>
                                )}
                                {oneUser.isCelebrity && <span style={{ color: 'red' }}>This account is fake and handled by the developer</span>}
                                {userId === currentUser._id && <Button white onClick={handleLogout}>Log out</Button>}
                            </InfoContainer>
                        </Info>
                    </ProfileInfo>

                    <GalleryBox>
                        {postsFetching ? (
                            <Box className='loader'>
                                <CircularProgress />
                            </Box>
                        ) : error ? <h2>Something went wrong</h2> : <>
                            {posts.length === 0 ? <h2 style={{ textAlign: 'center' }}>No posts</h2> : <>
                                {posts.map(post => (
                                    <Image onClick={() => {
                                        setPostModal(true)
                                        setPostId(post._id)
                                    }} key={post._id} src={post.image}>
                                        <ImageBox>
                                            <span><i className='fa-solid fa-heart profileIcon' /> 67</span>
                                            <span><i className='fa regular fa-comment profileIcon' /> 23</span>
                                        </ImageBox>
                                    </Image>
                                ))}
                            </>}
                        </>}
                    </GalleryBox>
                </Container>
            )}
            <Modal open={open} onClose={handleClose}>
                <Box className='user-modal'>
                    <UserModal data={modalData} dataType={dataType} />
                </Box>
            </Modal>

            <Modal open={postModal} onClose={handlePostClose}>
                <Box className='post-modal'>
                    <PostModal postId={postId} />
                </Box>
            </Modal>
        </>
    )
}

export default Profile