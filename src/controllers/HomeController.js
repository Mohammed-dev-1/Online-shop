const Users = require('../data/model/user.model');
const Products = require('../data/model/product.model');

exports.page = async (req, res, next, errorMessage = '') => {
  try {
    const products = await Products.findAll({ include: Users });
    let errors = req.flash('error') ? req.flash('error') : [];

    res.render('shop', {
      pageTitle: 'Online Shop',
      prods: products || [],
      pagePath: '/',
      errors,
      userId: !!req.user ? req.user.id : 0 
    })
  } 
  catch (error) {
    console.log(error.message);
    res.redirect('/error');
  }
}