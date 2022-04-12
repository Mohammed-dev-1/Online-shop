const AppError = require('../util/errors-handling/app.error');
const User = require('../data/model/user.model');

exports.page = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const productInCart = await cart.getProducts({include: [{model: User}]});

    res.render('cart', {
      pageTitle: 'My Cart',
      pagePath: '/cart',
      cartProduct: productInCart,
      errors: req.flash('error')
    })
  }
  catch(err) {
    console.log(err.message)
  }
}

exports.product = (req, res, next) => {
  try {
    const productId = +req.params.id
    
    if(req.query.mode == 'edit') editDetails(req, res);
    else addToCart(req, res, productId);
  }
  catch(err) {
    console.log(err.message);
    res.redirect('back');
  }
}

const addToCart = async (req, res, productId) => {
  let quantity = 1;
  try {
    const userCart = await req.user.getCart();    
    const productInCart = await userCart.getProducts({
      where: {id: productId}
    });
    
    if(productInCart.length > 0) {
      quantity = productInCart[0].cartItem.dataValues.quantity + 1;
    }
    
    await userCart.addProduct(productId, {through: {quantity: quantity}});
    res.redirect('/cart');
  } 
  catch(err) {
    console.log(err.message);
    res.redirect('back');
  }
}

const editDetails = (req, res) => {
  res.status(200).render('add-product', {
    pageTitle: 'Add Products',
    pagePath: '/product',
    editValues: req.product,
    allowEdit: (req.query.mode == 'edit'),
    errors: req.flash('error'),
    body: req.flash('body')        
  });
}

exports.drop = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productsInCart = await (await req.user.getCart())
      .getProducts({ where: {id: productId} });
    
    if(productsInCart.length == 0) 
      throw new AppError([{message:'Product not found!'}]); 

    await productsInCart[0].cartItem.destroy();
    res.redirect('/cart');
  } 
  catch (err) {
    req.flash('error', err.errors);
    res.redirect('/cart');
    console.log(err.message);
  }
}

exports.get = async (req, res, next) => {}