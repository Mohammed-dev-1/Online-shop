// API routes
const authAPI = require('../routes/API/auth');

// Web routes
const authRoutes = require('../routes/auth');
const profileRoutes = require('../routes/profile');
const productRoutes = require('../routes/product');
const adminRoutes = require('../routes/admin');
const homeRoutes = require('../routes/home');
const cartRoutes = require('../routes/cart');
const orderRoutes = require('../routes/order');
const page404Routes = require('../routes/pageNotFound');
module.exports = {
  authRoutes,
  profileRoutes,
  productRoutes,
  adminRoutes,
  homeRoutes,
  cartRoutes,
  orderRoutes,
  page404Routes,
  authAPI
}