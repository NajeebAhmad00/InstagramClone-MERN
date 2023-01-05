import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    Container,
    Box,
    Logo,
    Text,
    Input,
    Button,
    TextBottom
} from '../styles/Register'
import { registerUser } from '../redux/apiCalls'
import { publicRequest } from '../requestMethods'

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const email = useRef()
    const fullName = useRef()
    const username = useRef()
    const password = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const code = Math.random().toString().substr(2, 6)
        try {
            await registerUser(dispatch, {
                email: email.current.value,
                fullName: fullName.current.value,
                username: username.current.value,
                password: password.current.value,
                code
            })
            publicRequest.post('/mails/client', {
                email: email.current.value,
                code
            })
            navigate('/confirmation')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <Box>
                <Logo src='./images/logo.PNG' />

                <Text top>Sign up to see photos and videos from your friends.</Text>

                <form>
                    <Input type='text' placeholder='Email' ref={email} required />
                    <Input type='text' placeholder='Full Name' ref={fullName} required />
                    <Input type='text' placeholder='Username' ref={username} required />
                    <Input type='password' placeholder='Password' ref={password} required minLength={6} />

                    <Text>
                        People who use our service may have uploaded your contact information to Instagram. <a href='https://www.facebook.com/help/instagram/261704639352628' className='link' target='_blank' rel="noreferrer">Learn More</a>
                    </Text>

                    <Text>
                        By signing up, you agree to our <a href='https://help.instagram.com/581066165581870/?locale=en_US' className='link' target='_blank' rel="noreferrer">Terms</a>, <a href='https://www.facebook.com/privacy/policy' className='link' target='_blank' rel="noreferrer">Privacy Policy</a> and <a href='https://help.instagram.com/1896641480634370/' className='link' target='_blank' rel="noreferrer">Cookies Policy</a>.
                    </Text>

                    <Button type='submit' onClick={handleSubmit}>Sign Up</Button>
                </form>
            </Box>

            <Box>
                <TextBottom>Have an account? <Link to='/' className='link'>Log in</Link></TextBottom>
            </Box>
        </Container >
    )
}

export default Register