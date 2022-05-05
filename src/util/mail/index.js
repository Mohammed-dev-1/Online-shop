const nodemailer = require('nodemailer');

const fakeAccountTransporter = async() => {
  const fakeAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: fakeAccount.smtp?.host,
    port: fakeAccount.smtp?.port,
    secure: fakeAccount.smtp?.secure,
    auth: {
      user: fakeAccount.user,
      pass: fakeAccount.pass
    }
  })
}

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'trudie.parker57@ethereal.email',
    pass: 'Jfq68Xm9nuuecYs6G4'
  }
})

exports.createMail = async(mailConfig) => {
  // const transporter = await fakeAccountTransporter();
  await transporter.sendMail(mailConfig)
}