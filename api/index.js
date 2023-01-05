const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const app = express()

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const mailRoutes = require('./routes/mail')

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err))

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/mails', mailRoutes)

// app.use(express.static(path.join(__dirname, '/client/build')))
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/client/build', 'index.html')))

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running...')
})