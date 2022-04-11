const { multer, path } = require('../../../env');
console.log(path.join(__dirname, '..', '..', 'product-panel'));
const fileStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    /**
     * first arg for passing an error
     * second one is a folder to store image inside of it
     */
    callBack(null, 'src/product-panel');
  },
  filename: (req, file, callBack) => {
    /**
     * first arg for passing an error
     * second one is the file name
     */
    callBack(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, callBack) => {
  if(
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    callBack(null, true);  
  } else {
    callBack(null, false);
  }
}

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });
const fileUploadConfigrations = upload.fields([
  {
    name: 'image',
    maxCount: 1
  }
]);

module.exports = fileUploadConfigrations;