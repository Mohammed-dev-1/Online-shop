const User = require('../../data/model/user.model');
const bcrypt = require('bcryptjs');

exports.userLoginValidation = async (value, { req, location, path }) => {
  try {
    //check user if not have an account..
    const user = await User.findOne({ where: { email: value } })
    if (!user) return Promise.reject('Email or password was wrong.');  

    //check if user have the same password was logged in..
    const passwordValidate = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValidate) return Promise.reject('Email or password was wrong.')

    req.userValidated = user;
  } 
  catch(err) {
    console.log(err.message);
  }
}

exports.userExistValidation = async (value, {req, location, path}) => {
  try {
    //check user if not have an account..
    const user = await User.sequelize
      .query('SELECT `email` FROM `users` as `user` WHERE `user`.`email` = ?', {
        replacements: [value]
      });

    if (user[0].length > 0) return Promise.reject('Email already exist.');
  } 
  catch (err) {
    console.log(err.message);
  }
}