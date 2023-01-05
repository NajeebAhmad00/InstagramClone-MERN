import { Link } from 'react-router-dom'
import {
    ListGroup,
    ListItem,
    ProfileImg,
    ProfileName,
    UserName
} from '../styles/Search'
import { BlueTick } from '../styles/Profile'

const UserModal = ({ data, dataType }) => {
    return (
        <ListGroup>
            <div style={{
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: '600',
                borderBottom: '1px solid #dbdbdb',
                padding: '5px 0'
            }}>
                {dataType}
            </div>
            {data?.length === 0 ? <h2>No users to show</h2> : (
                <>
                    {data.map(user => (
                        <Link key={user._id} to={`/profile/${user._id}`} className='link'>
                            <ListItem key={user._id}>
                                <ProfileImg img={user.profileImg ? user.profileImg : '/images/avatar.png'} />
                                <div>
                                    <UserName>{user.username}</UserName>
                                    <ProfileName>{user.fullName}</ProfileName>
                                </div>
                                {user.isCelebrity && <BlueTick search src='/images/bluetick.PNG' />}
                            </ListItem>
                        </Link>
                    ))}
                </>
            )}
        </ListGroup>
    )
}

export default UserModal