const {
  db,
  app,
  port,
  cors, 
  csrf,
  path, 
  flash,
  session,
  express,
  TWO_HOURS,
  bodyParser,
  cookieParser,
  methodOverride,
  sqlSessionConnection, 
  adminRoutes, 
  authRoutes, 
  cartRoutes, 
  orderRoutes, 
  homeRoutes,
  profileRoutes,
  productRoutes,
  page404Routes, 
  authAPI, 
  initUserMeddleware,
  fileUploadConfigrations,
  RunRelation
} = require('./env');

//Set EJS as render engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'view', 'ejs'));

//use cors to enable on local server
app.use(cors());
//recive post request with json format
app.use(bodyParser.json());
//use body pareser to parse our html page
app.use(bodyParser.urlencoded({extended: false}));
//use express static method to load all css files
app.use(express.static(path.join(__dirname, 'src', 'public')));
//use express static method to load images, add /product-panel to load just images with this path
app.use('/src/product-panel', express.static(path.join(__dirname, 'src', 'product-panel')));

app.use(
  session({
    secret: 'Vector',
    store: new sqlSessionConnection({db: db}),
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      maxAge: TWO_HOURS,
      sameSite: true,
      secure: false
    }
  })
);

// override with POST having ?_method=DELETE
// app.use(methodOverride('_method'))
app.use((req, res, next) => {
  if(req.body._method != undefined) {
    req.method = req.body._method;
  }

  next();
})
//for testing api
app.use('/api', authAPI);

//Alterantive package to upload files...
// app.use(fileUpload({
//   createParentPath: true
// }));
app.use(cookieParser('Vector'));
//check authorization user for every request...
app.use(initUserMeddleware);
//init flash message for every request...
app.use(flash());
//use multer to handle files
app.use(fileUploadConfigrations);
//init csrf token for more scure
app.use(csrf({cookie: true}));
//set a local variables to all respones...
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isLoggedIn = !!req.user;
  res.locals.username = !!req.user ? req.user.name : '';
  next();
})

//load all express routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/profile', profileRoutes);
app.use('/product', productRoutes);
app.use(homeRoutes);
app.use(page404Routes);

//Define relationships
RunRelation();

db.sync({ force: false })
  .then(
    _ => {
      app.listen(port);
      console.log(`Your app is runing on: http://localhost:${port}`)
    },
    err => {
      console.log('Database: ', err);
    }
  );
