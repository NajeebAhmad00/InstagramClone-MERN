import Navbar from '../components/Navbar'
import Post from '../components/Post'
import {
    Container,
} from '../styles/Feed'
import { posts } from '../data'

const Feed = () => {
    return (
        <>
            <Navbar />

            <Container>
                {posts.map(post => (
                    <Post post={post} key={post._id} />
                ))}
            </Container>
        </>
    )
}

export default Feed