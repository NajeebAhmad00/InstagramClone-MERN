import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress } from '@mui/material'
import Navbar from '../components/Navbar'
import { Container } from '../styles/Profile'
import {
    ListGroup,
    ListItem,
    ProfileImg,
    ProfileName,
    UserName,
    SearchBox
} from '../styles/Search'
import { BlueTick } from '../styles/Profile'
import { getUsers } from '../redux/apiCalls'

const Search = () => {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const { currentUser, users, isFetching } = useSelector(state => state.user)

    useEffect(() => {
        const token = currentUser.accessToken
        getUsers(dispatch, { token })
    }, [dispatch])

    const filteredUsers = useMemo(() => {
        const usersList = users?.filter(user => user._id !== currentUser._id)
        return usersList.filter(user => {
            return user.username.toLowerCase().includes(query.toLowerCase())
        })
    }, [users, query])

    return (
        <>
            <Navbar />

            <Container>
                <SearchBox placeholder='Search' autoFocus onChange={e => setQuery(e.target.value)} />
                {isFetching ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <ListGroup>
                        {filteredUsers.map(user => (
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
                    </ListGroup>
                )}
            </Container>
        </>
    )
}

export default Search