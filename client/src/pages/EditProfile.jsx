import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import Navbar from '../components/Navbar'
import {
    Container,
    ProfileImage,
    Box,
    Right,
    Label,
    Input,
    Text,
    Textarea,
    Button,
    PhotoLabel
} from '../styles/EditProfile'
import { updateUser } from '../redux/apiCalls'
import { CircularProgress, Modal, Box as MUIBox } from '@mui/material'

const EditProfile = () => {
    const disptach = useDispatch()
    const navigate = useNavigate()
    const fullName = useRef()
    const username = useRef()
    const bio = useRef()
    const linkedIn = useRef()
    const facebook = useRef()
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { currentUser } = useSelector(state => state.user)
    const [bioLength, setBioLength] = useState(currentUser.bio?.length)

    const handleClose = () => setOpen(false)

    const handleUpdate = async () => {
        setLoading(true)
        const token = currentUser.accessToken
        const { _id: id } = currentUser
        try {
            if (file) {
                const imageRef = ref(storage, `profileImages/${file.name + v4()}`)
                uploadBytes(imageRef, file)
                    .then((snapshot) => {
                        getDownloadURL(snapshot.ref)
                            .then(async url => {
                                await updateUser(disptach, id, {
                                    fullName: fullName.current.value,
                                    username: username.current.value,
                                    bio: bio.current.value,
                                    linkedIn: linkedIn.current.value,
                                    facebook: facebook.current.value,
                                    profileImg: url,
                                    token
                                })
                                navigate(`/profile/${currentUser._id}`)
                            })
                    }).catch(err => console.error(err))
            } else {
                await updateUser(disptach, id, {
                    fullName: fullName.current.value,
                    username: username.current.value,
                    bio: bio.current.value,
                    linkedIn: linkedIn.current.value,
                    facebook: facebook.current.value,
                    token
                })
                navigate(`/profile/${currentUser._id}`)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async () => {
        const token = currentUser.accessToken
        const { _id: id } = currentUser
        await updateUser(disptach, id, {
            profileImg: '',
            token
        })
        navigate(`/profile/${currentUser._id}`)
    }

    return (
        <>
            <Navbar />

            <Container>
                <Box>
                    <ProfileImage img={file === '' ? '/images/avatar.PNG' : file ? URL.createObjectURL(file) : currentUser.profileImg && currentUser.profileImg?.length !== 0 ? currentUser.profileImg : '/images/avatar.PNG'} />

                    {currentUser.profileImg && currentUser.profileImg?.length !== 0 ? (
                        <PhotoLabel onClick={() => setOpen(true)}>
                            Change profile photo
                        </PhotoLabel>
                    ) : (
                        <PhotoLabel htmlFor='photoImg'>Set Profile Photo</PhotoLabel>
                    )}
                    <Input type='file' style={{ display: 'none' }} id='photoImg' onChange={(e) => {
                        setFile(e.target.files[0])
                        setOpen(false)
                    }} />
                </Box>

                <Box>
                    <Label>Name</Label>
                    <Right>
                        <Input ref={fullName} defaultValue={currentUser.fullName} />
                    </Right>
                </Box>

                <Box>
                    <Label>Username</Label>
                    <Right>
                        <Input ref={username} defaultValue={currentUser.username} />
                        <Text>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</Text>
                    </Right>
                </Box>

                <Box>
                    <Label>Bio</Label>
                    <Right>
                        <Textarea
                            ref={bio}
                            defaultValue={currentUser.bio}
                            maxLength={150}
                            onChange={(e) => setBioLength(e.target.value.length)}
                        />
                        <Text>{bioLength} / 150</Text>
                        <Text>Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.</Text>
                    </Right>
                </Box>

                <Box>
                    <Label>LinkedIn</Label>
                    <Right>
                        <Input ref={linkedIn} defaultValue={currentUser.linkedIn} />
                    </Right>
                </Box>

                <Box>
                    <Label>Facebook</Label>
                    <Right>
                        <Input ref={facebook} defaultValue={currentUser.linkedIn} />
                    </Right>
                </Box>

                <p style={{ color: 'red', fontSize: '1rem', textAlign: 'center' }}>
                    If the profile doesn't get updated, logout and then log in again and then edit your profile. Since your last log in gets expired.
                </p>
                {loading && <CircularProgress />}
                <Button onClick={handleUpdate}>Submit</Button>
            </Container>

            <Modal open={open} onClose={handleClose}>
                <MUIBox className='profileImgModal'>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '600' }}>Change profile photo</h3>
                    <label style={{
                        color: '#5791E8',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                        htmlFor='photoImg'
                    >
                        Upload photo
                    </label>
                    <span style={{
                        color: '#DB565B',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                        onClick={handleDelete}
                    >Remove photo</span>
                </MUIBox>
            </Modal>
        </>
    )
}

export default EditProfile