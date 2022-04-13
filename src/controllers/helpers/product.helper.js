exports.createProduct = async (req, product) => {
  try {
    return await req.user.createProduct({
      title: product.title,
      price: product.price,
      description: product.description,
      imagePath: product.imagePath
    });
  } 
  catch (err) {
    console.log(err.message);
    res.redirect('back');
  }
}

exports.updateProduct = async (req, product) => {
  try {
    console.log('Product current: ', req.product);
    console.log('Product payload: ', product);
    return await req.product.set(product);
  } 
  catch (err) {
    console.log(err.message);
    res.redirect('back');    
  }
}