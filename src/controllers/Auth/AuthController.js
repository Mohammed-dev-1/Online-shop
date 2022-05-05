const User = require('../../data/model/user.model');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const AppError = require('../../util/errors-handling/app.error');
const { createMail } = require('../../util/mail');
const { TWO_HOURS } = require('../../../env');

exports.registerPage = (req, res, next) => {
  res.status(200).render('register',{
    pageTitle: 'Register page',
    pagePath: '/auth/register',
    errors: req.flash('error'),
    body: req.flash('body')
  });
}

exports.loginPage = (req, res, next) => {
  res.status(200).render('login',{
    pageTitle: 'Login page',
    pagePath: '/auth/login',
    errors: req.flash('error'),
    body: req.flash('body')
  });
}

exports.resetPasswordPage = (req, res, next) => {
  res.status(200).render('reset-password', {
    pageTitle: 'Reset password page',
    pagePath: '/auth/reset',
    errors: req.flash('error'),
    body: req.flash('body')
  });
}

exports.resetPasswordWithTokenPage = (req, res, next) => {
  res.status(200).render('reset-password-with-token', {
    pageTitle: 'Reset password',
    pagePath: '/auth/reset',
    token: req.params.token,
    errors: req.flash('error'),
    body: req.flash('body')
  });
}

exports.register = async (req, res, next) => {
  let {username, email, password} = req.body;

  try {    
    //Hash password
    password = await bcrypt.hash(password, 12);
    
    //Create new user
    const user_session_data = await User.create({name: username, email, password});
    
    //create cart for this user
    await user_session_data.createCart();

    //register user data on server session
    req.session.user = await user_session_data;
    
    req.session.save(err => {
      console.log(err); 

      //after complet creation redirect to home page
      res.redirect('/');
    })
  } 
  catch(err) {
    next(err);
  }
}

exports.login = async (req, res, next) => {
  try {    
    //register user data on server session
    req.session.user = req.userValidated;
    req.session.save(err => {
      console.log(err);
      res.redirect('/');
    })
    // await createMail();
    console.log('Send mail done');
  } 
  catch(err) {
    console.log(err);
    next(err);
  }
}

exports.resetPassword = async(req, res, next) => {
  const user = req.user;

  try {
    crypto.randomBytes(32, async(err, buffer) => {
      user.token = buffer.toString('hex');
      user.tokenExpirationDate = Date.now() + TWO_HOURS;
      await user.save();
      res.redirect('back');
      await createMail({
        from: '<team@triangle.com>',
        to: user.email,
        subject: 'Reset password link',
        text: 'Let\'s reset your password.',
        html: `
          <h5>You have only two hours to reset your password!</h5>
          <p>So click to the link down blow to reset it.</p>
          <a href='http://localhost:3000/auth/reset/${user.token}'>Click here</a>
        `
      });
    });
  }
  catch(err) {
    console.log(`Send login link: ${err.message}`);
    res.redirect('back');
  }
}

exports.resetPasswordConfirmation = async(req, res, next) => {
  const { password } = req.body;
  const user = req.user;

  try {
    user.tokenExpirationDate = Date.now() + TWO_HOURS;
    user.password = await bcrypt.hash(password, 12);
    await user.save();

    req.body.email = req.user.email;
    req.flash('body', req.body)
    res.redirect('/auth/login');
  }
  catch(err) {
    console.log(`resetPasswordConfirmation: ${err.message}`);
    res.redirect('back')
  }
}

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  })
}