const Product = require('../data/model/product.model');
const User = require('../data/model/user.model');

exports.page = (req, res, next) => {
    res.status(200).render('add-product', {
        pageTitle: 'Add Products',
        pagePath: '/product',
        errors: req.flash('error'),
        body: req.flash('body')        
    });
}

exports.details = async (req, res, next) => {
    try {
      const productId = req.params.id;
      const productDetails = await Product.findOne({where: {id: productId}, include: User})
  
      if(!productDetails) req.flash('error', [{message: 'Internal server error'}]);
  
      res.render('product-details', {
        pageTitle: 'Product Details',
        pagePath: '',
        product: productDetails,
        errors: req.flash('error'),
        userId: !!req.user ? req.user.id : 0 
      })
    }
    catch(err) {
        console.log(err.message);
    }
}

exports.create = async (req, res, next) => {
    const {title, price, description} = req.body;
    const imagePath = req.files.image[0].path;
    console.log(imagePath);
    console.log(req.files.image);
    try {
        await req.user.createProduct({title,price,description,imagePath});
        res.status(201).redirect('/');
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

exports.drop = async (req, res, next) => {
    try {
        await Product.set([]);
        res.status(200).redirect('/');
    } catch (error) {
        console.log(error);   
    }
}