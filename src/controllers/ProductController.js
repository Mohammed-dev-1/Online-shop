const Product = require('../data/model/product.model');
const User = require('../data/model/user.model');
const { createProduct, updateProduct } = require('./helpers/product.helper');

exports.page = async (req, res, next) => {
    let productDetails = req.product;

    res.status(200).render('add-product', {
        pageTitle: 'Add Products',
        pagePath: '/product',
        errors: req.flash('error'),
        productDetails: productDetails,
        body: req.flash('body'),
        editMode: productDetails
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
        res.status(500).redirect('back');
    }
}

exports.create = async (req, res, next) => {
    const editMode = (req.query.mode == 'edit');
    // req.body.imagePath = req.files.image[0].path;
    console.log(req.files);

    try {
        if(editMode) {
            await updateProduct(req, req.body);
        } else {
            await createProduct(req, req.body)
        }
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