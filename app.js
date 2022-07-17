const db = require('./src/util/connection');
const package = require('./src/module/package.module');
const userModule = require('./src/module/user.module');
const route = require('./src/module/route.module');
const uploadModule = require('./src/util/Upload-config/index.config');
const env = require('./env');

//Set EJS as render engine
package.app.set('view engine', 'ejs');
package.app.set('views', package.path.join(__dirname, 'src', 'view', 'ejs'));

//use cors to enable on local server
package.app.use(package.cors());
//recive post request with json format
package.app.use(package.bodyParser.json());
//use body pareser to parse our html page
package.app.use(package.bodyParser.urlencoded({extended: false}));
//use express static method to load all css files
package.app.use(package.express.static(package.path.join(__dirname, 'src', 'public')));
//use express static method to load images, add /product-panel to load just images with this path
package.app.use(`/${uploadModule.storePath}`, package.express.static(package.path.join(uploadModule.storePath)));

package.app.use(
  package.session({
    secret: 'Vector',
    store: new package.sqlSessionConnection({db: db}),
    resave: true, //false to forbid users comes from external links, true to enable 
    proxy: true,
    saveUninitialized: false,
    cookie: {
      maxAge: env.TWO_HOURS,
      sameSite: true,
      secure: false
    }
  })
);

// override with POST having ?_method=DELETE
// package.app.use(methodOverride('_method'))
package.app.use((req, res, next) => {
  if(req.query._method != undefined) {
    req.method = req.query._method;
  }
  next();
})
//for testing api
package.app.use('/api', route.authAPI);

//Alterantive package to upload files...
// package.app.use(fileUpload({
//   createParentPath: true
// }));
package.app.use(package.cookieParser('Vector'));
//check authorization user for every request...
package.app.use(userModule.initUser);
//init flash message for every request...
package.app.use(package.flash());
//use multer to handle files
package.app.use(uploadModule.fileUploadConfigrations);
//init csrf token for more scure
package.app.use(package.csrf({cookie: true}));
//set a local variables to all respones...
package.app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isLoggedIn = !!req.user;
  res.locals.username = !!req.user ? req.user.name : '';
  next();
})

//load all express routes
package.app.use('/auth', route.authRoutes);
package.app.use('/admin', route.adminRoutes);
package.app.use('/cart', route.cartRoutes);
package.app.use('/order', route.orderRoutes);
package.app.use('/profile', route.profileRoutes);
package.app.use('/product', route.productRoutes);
package.app.use(route.homeRoutes);
package.app.use(route.page404Routes);

//Define relationships
userModule.RunRelation();

db.sync({ force: false })
  .then(
    _ => {
      console.log('DB connected successfully!');
      package.app.listen(env.port, env.hostname);
      console.log(`Your app is runing on: http://${env.hostname}:${env.port}`)
    },
    err => {
      console.log('Database: ', err);
    }
  );
