import { Box, CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import { getFeed } from '../redux/apiCalls'
import {
    Container,
} from '../styles/Feed'

const Feed = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const { isFetching, posts, error } = useSelector(state => state.post)

    useEffect(() => {
        const { _id: id } = currentUser
        getFeed(dispatch, id)
    }, [])

    return (
        <>
            <Navbar />

            <Container>
                {isFetching ? <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box> : error ? (
                    <h2 className='notice'>Error</h2>
                ) : posts.length === 0 || posts.message === 'No users to follow' ? <h2 className='notice'>
                    Follow some users to view posts here or maybe people you follow haven't posted anything yet
                </h2> : <>
                    {posts.map(post => (
                        <Post key={post._id} post={post} />
                    ))}
                </>}
            </Container>
        </>
    )
}

export default Feed