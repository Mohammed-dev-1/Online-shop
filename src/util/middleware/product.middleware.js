const Product = require('../../data/model/product.model');

exports.adminOption = async (req, res, next) => {
  const optionMode = (
    req.method == 'PUT' || 
    req.method == 'PATCH' || 
    req.method == 'DELETE' ||
    req.query.mode == 'option'
  );
  const productId = req.query.id;  
  let product = {};
  
  if(optionMode) {
    try {
      product = await Product.findByPk(productId);
      //Only Same user can be edit it.
      if(product.userId != req.user.id) {
        req.flash('error', [{message:'Only owner of product can do it.'}]);
        res.redirect('/profile');
        return;
      } 

      req.product = product;      
      return next();
    } 
    catch (err) {
      console.log('Option mode: ', err.message);
      res.status(500).redirect('back');
      return;
    }
  }

  req.product = null;
  next();
}

// exports.sameUser = async (req, res, next) => {
//   const productId = +req.params.id
//   let product = {};
  
//   try {
//     product = await Product.findByPk(productId);
//   } catch(err) {
//     console.log(err.message);
//   }

//   if(!product) {
//     req.flash('error', [{message:'Product not found!'}]);
//     res.redirect('back');
//     return;
//   }

//   if(req.user.id == product.userId && req.query.mode != 'edit') {
//     req.flash('error', [{message:'Can\'t add product to cart with the same user'}]);
//     res.redirect('back');
//     return;
//   }
  
//   if(req.user.id != product.userId && req.query.mode == 'edit') {
//     req.flash('error', [{message:'Only owner of product can edit it.'}]);
//     res.redirect('back');
//     return;
//   }
  
//   req.product = product;
//   next();
// }
