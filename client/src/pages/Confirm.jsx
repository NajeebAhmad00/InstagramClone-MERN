import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Box,
    Logo,
    Text,
    Input,
    Button,
    TextBottom
} from '../styles/Register'
import { Err } from '../styles/Login'
import { updateUser } from '../redux/apiCalls'
import { userRequest } from '../requestMethods'

const Confirm = () => {
    const code = useRef()
    const dispatch = useDispatch()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)
    const { currentUser } = useSelector(state => state.user)

    const token = currentUser?.accessToken

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await userRequest.get(`/users/find/${currentUser._id}`, {
                    token
                })
                setUser(data)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        getUser()
    }, [])

    const handleClick = async (e) => {
        e.preventDefault()

        const { _id: id } = currentUser
        if (Number(code.current.value) === user.confirmationCode) {
            updateUser(dispatch, id, {
                isActive: true
            })
        } else {
            setErr(true)
        }
    }

    return (
        <Container>
            <Box>
                <Logo src='./images/logo.PNG' />

                <Text top>Enter the confirmation code we sent to {currentUser.email}. <Link className='link'>Resend Code</Link></Text>

                <Input type='number' placeholder='Confirmation Code' required ref={code} />
                {err && (
                    <Err>The confirmation code you typed in incorrect. Please try again.</Err>
                )}
                <Button onClick={handleClick} disabled={loading}>Next</Button>
            </Box>

            <Box>
                <TextBottom>Have an account? <Link to='/' className='link'>Log in</Link></TextBottom>
            </Box>
        </Container>
    )
}

export default Confirm