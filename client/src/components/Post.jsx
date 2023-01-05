import { Link } from 'react-router-dom'
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

const Post = ({ post }) => {
    return (
        <Box>
            <PostTop>
                <ProfileImage profile={post.profileImg} />
                <ProfileName>{post.username}</ProfileName>
                {/* <PostTopR>
                    <i className='fa-solid fa-ellipsis' style={{ fontSize: '1.6rem' }}></i>
                </PostTopR> */}
            </PostTop>

            <PostCenter>
                <PostCenterImg src={post.postImg} />
                <Wrapper>
                    <i className='fa-regular fa-heart icon' />
                    <i className='fa-regular fa-comment icon' />
                    <Text>
                        <Link className='link'>
                            <ProfileName>{post.username}</ProfileName>
                        </Link>
                        {' '}
                        {post.postDesc}
                    </Text>
                    <Text comment gray pointer>View all {post.comments} comments</Text>
                    <Text date gray>3 days ago</Text>
                </Wrapper>
            </PostCenter>

            <PostBottom>
                <Input type='text' placeholder='Add a comment...' />
                <Span>Post</Span>
            </PostBottom>
        </Box>
    )
}

export default Post