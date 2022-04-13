const { validationResult, ValidationChain } = require('express-validator');

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(
      validation => validation.run(req)
    ));
    
    const errors = validationResult(req);
    if(errors.isEmpty()) return next();

    //WEB respones
    req.flash('error', 
      errors.array().map(
        err => {return {message: err.msg}}
      )
    );
    req.flash('body', req.body);
    res.redirect('back');
    
    //API respones
    // return res.json(errors.array().map(
    //   err => {return {message:err.msg}}
    // ));
  }
}

module.exports = validate;