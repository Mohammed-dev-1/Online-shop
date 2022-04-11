const Order = require('../../data/model/order.model');

exports.productExist = async (req, res, next) => {
  const order = await Order.findByPk(req.params.id);
  
  if(!order) {
    req.flash('error', [{message: 'Product not found!'}])
    res.redirect('/order');
  } else {
    req.order = order;
    next();
  }
}

exports.isAccess = (req, res, next) => {
  if(req.order.userId != req.user.id) {
    req.flash('error', [{message: 'Unauthorized'}])
    res.redirect('/order');
  } else {
    next();
  }
}