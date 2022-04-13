exports.imageTypeValidation = (value, {req, location, path}) => {
  const editMode = (req.query.mode == 'edit');

  //Skip validation for editing mode...
  if(editMode) {
    return true;
  }

  //Check mimeType for creating mode...
  return Object.keys(req.files).length == 0 ? 
    Promise.reject('Image should be with .jpg, .png, .jpeg mimeType.') : true;
  
  // const mimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  // const typeStatus = mimeTypes.some(type => req.files.image[0].mimetype == type);
  // console.log(typeStatus);
  // if (!typeStatus) {
  //   return Promise.reject('Image should be with .jpg, .png, .jpeg mimeType.')
  // }
}