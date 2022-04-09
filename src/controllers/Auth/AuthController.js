const User = require('../../data/model/user.model');
const bcrypt = require('bcryptjs');
const AppError = require('../../util/errors-handling/app.error');

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

exports.login = (req, res, next) => {
  try {    
    //register user data on server session
    req.session.user = req.userValidated;
    req.session.save(err => {
      console.log(err);
      res.redirect('/');
    })
  } 
  catch(err) {
    next(err);
  }
}

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  })
}