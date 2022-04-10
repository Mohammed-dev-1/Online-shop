exports.imageTypeValidation = (value, {req, location, path}) => { 
  if (Object.keys(req.files) == 0 || req.files[0] == undefined) {
    return Promise.reject('Image should be with .jpg, .png, .jpeg mimeType.')
  }
  const mimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const typeStatus = mimeTypes.some(type => req.files.image[0].mimetype == type);
  console.log(typeStatus);
  if (!typeStatus) {
    return Promise.reject('Image should be with .jpg, .png, .jpeg mimeType.')
  }
}