import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal, Box } from '@mui/material'
import {
    HomeOutlined,
    AddCircleOutlineOutlined,
    FavoriteBorder
} from '@mui/icons-material'
import AddPost from './AddPost'
import {
    Nav,
    Logo,
    Input,
    ListGroup,
    ListItem,
    ProfileLogo,
    SecondNav,
    Item
} from '../styles/Navbar'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const { currentUser } = useSelector(state => state.user)
    const url = location.pathname.split('/')[1]

    const handleClose = () => setOpen(false)

    return (
        <>
            <Nav>
                <Link to='/'>
                    <Logo src='/images/logo.PNG' />
                </Link>

                {url !== 'search' && <Input type='text' placeholder='Search' onClick={() => navigate('/search')} />}

                <ListGroup>
                    <ListItem>
                        <Link to='/feed' className='link'>
                            <HomeOutlined className='icon' />
                        </Link>
                    </ListItem>
                    <ListItem><AddCircleOutlineOutlined className='icon' onClick={() => setOpen(true)} /></ListItem>
                    <ListItem><FavoriteBorder className='icon' /></ListItem>
                    <ListItem>
                        <Link to={`/profile/${currentUser._id}`}>
                            <ProfileLogo big img={currentUser.profileImg ? currentUser.profileImg : '/images/avatar.png'} />
                        </Link>
                    </ListItem>
                </ListGroup>
            </Nav>
            <SecondNav>
                <Item>
                    <HomeOutlined className='icon' />
                </Item>
                <Item>
                    <AddCircleOutlineOutlined className='icon' onClick={() => setOpen(true)} />
                </Item>
                <Item>
                    <FavoriteBorder className='icon' />
                </Item>
                <Item>
                    <Link to={`/profile/${currentUser._id}`}>
                        <ProfileLogo img={currentUser.profileImg ? currentUser.profileImg : '/images/avatar.png'} />
                    </Link>
                </Item>
            </SecondNav>

            <Modal open={open} onClose={handleClose}>
                <Box className='add-modal'>
                    <AddPost />
                </Box>
            </Modal>
        </>
    )
}

export default Navbar