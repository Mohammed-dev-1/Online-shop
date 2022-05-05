const User = require('../../data/model/user.model');
const bcrypt = require('bcryptjs');

exports.userLoginValidation = async (value, { req, location, path }) => {
  try {
    if(req.body.password.length < 6) return true;

    //check user if not have an account..
    const user = await User.findOne({ where: { email: value } })
    if (!user) return Promise.reject('Email or password was wrong.');  

    //check if user have the same password was logged in..
    const passwordValidate = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValidate) return Promise.reject('Email or password was wrong.')

    req.userValidated = user;
    return true;
  } 
  catch(err) {
    console.log(err.message);
  }
}

exports.userExistValidation = async (value, {req, location, path}) => {
  try {
    //check user if not have an account..
    const user = await findUserByEmail(value);
    if (user[0].length) return Promise.reject('Email already exist.');
  } 
  catch (err) {
    console.log(err.message);
  }
}

exports.userNotExistValidation = async (value, {req, location, path}) => {
  try {
    const user = await User.findOne({ where: { email: value } })
    if (!user) return Promise.reject('Email is uncorrect!')

    req.user = user;
    return true;
  }
  catch(err) {
    console.log(`userNotExistValidation: ${err.message}`);
  }
}

exports.userTokenValidation = async(value, {req, location, path}) => {
  const user = await User.findOne({ where: { token: value } });
  if (!user) return Promise.reject('User not found!');

  if (user.tokenExpirationDate <= Date.now()) 
    return Promise.reject('Reset expiration date was done');

  req.user = user;
  return true;
}

const findUserByEmail = async(email) => {
  const user = await User.sequelize
    .query('SELECT `email` FROM `users` as `user` WHERE `user`.`email` = ?', {
      replacements: [email]
    });
  return user;
}