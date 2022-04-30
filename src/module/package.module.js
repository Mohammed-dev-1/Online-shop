const express = require('express');
const session = require('express-session');
const sqlSessionConnection = require("connect-session-sequelize")(session.Store);
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const flash = require('connect-flash');
const csrf = require('csurf');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const app = express();
const router = express.Router();

module.exports = {
  express,
  session,
  path,
  bodyParser,
  cors,
  flash,
  csrf,
  multer,
  cookieParser,
  methodOverride,
  app,
  router,
  sqlSessionConnection
}

