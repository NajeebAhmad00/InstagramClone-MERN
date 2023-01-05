import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Feed = lazy(() => import('./pages/Feed'))
const Profile = lazy(() => import('./pages/Profile'))
const Confirm = lazy(() => import('./pages/Confirm'))
const Search = lazy(() => import('./pages/Search'))

const App = () => {
  const { currentUser } = useSelector(state => state.user)

  return (
    <Router>
      <Suspense fallback={
        <Box className='loader big-loader'>
          <CircularProgress />
        </Box>
      }>
        <Routes>
          <Route path='/' element={
            currentUser?.isActive ? <Navigate to='/feed' /> : <Login />
          } />
          <Route path='/register' element={
            currentUser?.isActive ? <Navigate to='/feed' /> : <Register />
          } />
          <Route path='/confirmation' element={
            currentUser?.isActive ? <Navigate to='/feed' /> : <Confirm />
          } />
          <Route path='/feed' element={
            currentUser?.isActive ? <Feed /> : <Navigate to='/' />
          } />
          <Route path='/profile/:id' element={
            currentUser?.isActive ? <Profile /> : <Navigate to='/' />
          } />
          <Route path='/search' element={
            currentUser?.isActive ? <Search /> : <Navigate to='/' />
          } />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App