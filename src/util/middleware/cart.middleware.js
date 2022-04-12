const Product = require('../../data/model/product.model');

exports.sameUser = async (req, res, next) => {
  const productId = +req.params.id
  let product = {};
  
  try {
    product = await Product.findByPk(productId);
  } catch(err) {
    console.log(err.message);
  }

  if(!product) {
    req.flash('error', [{message:'Product not found!'}]);
    res.redirect('back');
    return;
  }

  if(req.user.id == product.userId && req.query.mode != 'edit') {
    req.flash('error', [{message:'Can\'t add product to cart with the same user'}]);
    res.redirect('back');
    return;
  }
  
  if(req.user.id != product.userId && req.query.mode == 'edit') {
    req.flash('error', [{message:'Only owner of product can edit it.'}]);
    res.redirect('back');
    return;
  }
  
  req.product = product;
  next();
}