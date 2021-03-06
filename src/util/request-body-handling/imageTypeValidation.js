exports.imageTypeValidation = (value, {req, location, path}) => {
  const optionMode = (
    req.method == 'PUT' || 
    req.method == 'PATCH'
  );

  //Skip validation for editing mode...
  if(optionMode) {
    return true;
  } 

  //Check mimeType for creating mode...
  return Object.keys(req.files).length == 0 ? 
    Promise.reject('Image should be with .jpg, .png, .jpeg mimeType.') : true;
}