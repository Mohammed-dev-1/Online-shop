exports.imageTypeValidation = (value, {req, location, path}) => {
  const editMode = (req.query.mode == 'edit');
  
  //Skip validation for editing mode...
  if(editMode) {
    return true;
  } 

  console.log('test after');
  //Check mimeType for creating mode...
  return Object.keys(req.files).length == 0 ? 
    Promise.reject('Image should be with .jpg, .png, .jpeg mimeType.') : true;
}