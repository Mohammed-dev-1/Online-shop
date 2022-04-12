const fs = require('fs');
const path = require('path');

const {createInvoiceReport} = require('./helpers/pdf.helper');

const Product = require('../data/model/product.model');
const User = require('../data/model/user.model');
const AppError = require('../util/errors-handling/app.error');

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

exports.getInvoice = async (req, res, next) => {
  const invoiceName = `invoice-${req.params.id}.pdf`;
  const order = req.order;
  let totalPrice = 0;
  let products = [];

  try {
    products = await order.getProducts();
    products.forEach(product => {
      totalPrice += product.price * product.orderItem.quantity;
    });
  } catch(err) {
    console.log(err.message);    
    return res.redirect('back');
  }

  try {
    const invoicePath = path.join('src','invoices',invoiceName);    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`);
    
    createInvoiceReport(res, invoicePath, products, order, totalPrice);
  }
  catch(err) {
    console.log(err.message);
    res.redirect('back');
  }
}