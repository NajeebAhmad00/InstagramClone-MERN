import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import {
    Heading,
    Container,
    Label,
    Input,
    Box,
    Image,
    TextArea
} from '../styles/AddPost'
import {
    ProfileImg,
    ProfileName,
    BlueTick
} from '../styles/PostModal'
import { Button } from '../styles/Login'
import { userRequest } from '../requestMethods'
import { Box as MUIBox, CircularProgress } from '@mui/material'

const AddPost = () => {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const caption = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const userId = location.pathname.split('/')[2]
    const { currentUser } = useSelector(state => state.user)

    const handleClick = async (e) => {
        e.preventDefault()

        try {
            const imageRef = ref(storage, `postImages/${file.name + v4()}`)
            setLoading(true)
            uploadBytes(imageRef, file)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then(async url => {
                            await userRequest.post(`/posts/`, {
                                author: currentUser._id,
                                image: url,
                                caption: caption.current.value,
                                token: currentUser.accessToken
                            })
                            await window.location.reload()
                            userId !== currentUser._id && navigate(`/profile/${currentUser._id}`)
                        })
                }).catch(err => console.error(err))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Heading>Create new post</Heading>
            {file ? <>
                <Container>
                    <Box img>
                        <Image src={URL.createObjectURL(file)} />
                    </Box>
                    <Box style={{ marginTop: '10px' }}>
                        <div>
                            <ProfileImg style={{ marginBottom: '-10px' }} img={currentUser.profileImg ? currentUser.profileImg : '/images/avatar.PNG'} />
                            <ProfileName style={{ margin: '10px' }}>{currentUser.username}</ProfileName>
                            {currentUser.isCelebrity && <BlueTick src='/images/bluetick.PNG' />}
                        </div>
                        <TextArea placeholder='Write a caption... (optional)' ref={caption} />
                        {loading ? <>
                            <MUIBox style={{ display: 'flex', justifyContent: 'center', marginTop: -40 }}>
                                <CircularProgress />
                            </MUIBox>
                            <span style={{ color: '#5791E8', fontSize: '0.8rem' }}>
                                If you're posting from a mobile devie, it might take time, specially if you're changing/editing profile picture. Please be patient
                            </span>
                        </> : <>
                            <Button style={{ marginBottom: '10px' }} onClick={handleClick}>Share</Button>
                        </>}
                    </Box>
                </Container>
            </> : (
                <Container noImg>
                    <AddPhotoAlternateOutlined style={{ fontSize: '5rem' }} />
                    <Label htmlFor='image'>Select photo</Label>
                    <Input type='file' id='image' onChange={(e) => setFile(e.target.files[0])} />
                </Container>
            )}
        </>
    )
}

export default AddPost