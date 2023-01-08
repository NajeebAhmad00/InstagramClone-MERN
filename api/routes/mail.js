const router = require('express').Router()
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS
    }
}))

router.post('/client', (req, res) => {
    transporter.sendMail({
        from: 'instgrmcln@gmail.com',
        to: req.body.email,
        subject: 'Confirmation code for Instagram Clone',
        html: `<p>The confirmation code for your account is: <span style="color: #5662F6;">${req.body.code}</span></p>`
    }, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent')
        }
    })
    console.log('Successfull')
})

module.exports = router
