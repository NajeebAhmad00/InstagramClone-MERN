import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box as MUIBox, CircularProgress } from '@mui/material'
import {
    Container,
    Section,
    Banner,
    Box,
    Logo,
    Input,
    Button,
    Text,
    Err
} from '../styles/Login'
import { login } from '../redux/apiCalls'

const Login = () => {
    const dispatch = useDispatch()
    const email = useRef()
    const password = useRef()
    const { isFetching, error } = useSelector(state => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('click')
        login(dispatch, {
            email: email.current.value,
            password: password.current.value
        })
    }

    return (
        <Container>
            <Section className='left'>
                <Banner src='./images/landing.PNG' />
            </Section>

            <Section>
                <Box>
                    <Logo src='./images/logo.PNG' />
                    <form onSubmit={handleSubmit}>
                        <Input type='text' placeholder='Email' ref={email} defaultValue='john@gmail.com' autoFocus />
                        <Input type='password' placeholder='Password' ref={password} defaultValue='123456' />

                        {error && (
                            <Err>Username or password is incorrect</Err>
                        )}

                        {isFetching && (<MUIBox style={{ display: 'flex', justifyContent: 'center', margin: '0 0 10px 0' }}>
                            <CircularProgress />
                        </MUIBox>)}

                        <Button style={{ margin: '0 0 30px 35px ' }} type='submit'>Log in</Button>
                        {/* <Text pass onClick={() => alert('Feature not available yet')}>Forgot password?</Text> */}
                    </form>
                </Box>

                <Box>
                    <Text>Don't have an account? <Link className='link' to='/register'>Sign Up</Link></Text>
                </Box>
            </Section>
        </Container>
    )
}

export default Login