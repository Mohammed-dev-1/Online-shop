const Product = require('../data/model/product.model');
const User = require('../data/model/user.model');
const AppError = require('../util/errors-handling/app.error');
const fs = require('fs');
const {path} = require('../../env');

exports.page = async (req, res, next) => {
  try {
    const productOrdered = await req.user.getOrders({
      include: [
        {
          model: Product,
          attributes: ['id', 'title', 'description', 'price', 'createdAt', 'updatedAt'],
          include: {
            model: User,
            attributes: ['id', 'name']
          },
          through: { attributes: ['quantity'] }
        }
      ]
    });

    res.render('order', {
      pagePath: '/order',
      pageTitle: 'My Orders',
      productOrdered: productOrdered,
      errors: req.flash('error')
    })
  }
  catch(err) {
    console.log(err.message);
  }
}

exports.add = async (req, res, next) => {
  try {
    const userCart = await req.user.getCart();
    let productsInCart = await userCart.getProducts();

    //Check if user have product in cart before added to order
    if(productsInCart.length == 0) 
      throw new AppError([{message:'Can\'t make an order because you don\'t have a product.'}]);
    
    //Create order to store order details
    const userOrder = await req.user.createOrder();

    productsInCart = productsInCart.map(product => {
      product.orderItem = {
        quantity: product.cartItem.quantity
      }
      return product
    });

    await userOrder.addProducts(productsInCart);
    
    //reset products in cart after added to Order list
    await userCart.setProducts([]);

    res.redirect('/order');
  }
  catch(err) {
    req.flash('error', err.errors);
    res.redirect('back');
    console.log(err.message);
  }
}

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.id;
  const invoiceName = `invoice-${orderId}.pdf`;
  const invoicePath = path.join('src','invoices',invoiceName);
  const stream = fs.createReadStream(invoicePath)
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`);
  stream.pipe(res);
}