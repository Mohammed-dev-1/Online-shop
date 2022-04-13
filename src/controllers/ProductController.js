const Product = require('../data/model/product.model');
const User = require('../data/model/user.model');

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

exports.update = async (req, res, next) => {
    const payload = req.body;
    
    if(Object.keys(req.files).length == 0) {
        payload.imagePath = req.product.imagePath; 
    } else {
        payload.imagePath = req.files.image[0].path;
    }

    console.log(payload);

    try {
        req.product.set(payload);
        await req.product.save();
        res.status(200).redirect('/profile');
    }
    catch(err) {
        console.log('update error: ', err.message);
        res.redirect('back');
    }

}

exports.create = async (req, res, next) => {
    try {
        const {title, price, description} = req.body;
        const imagePath = req.files.image[0].path;

        await req.user.createProduct({title, price, description, imagePath});
        res.status(201).redirect('/');
    } 
    catch (err) {
        console.log('Create: ', err.message);
        res.redirect('back');
    }
}

exports.drop = async (req, res, next) => {
    try {
        await Product.set([]);
        res.status(200).redirect('/');
    } 
    catch (error) {
        console.log(error);
        res.redirect('back');
    }
}