const imageInput = document.getElementById('image');
const imageSelected = document.getElementById('image-selected');
const fileReader = new FileReader();

imageInput.addEventListener('change', () => {
  //Select file from input
  fileReader.readAsDataURL(imageInput.files[0]);

  //Display it
  fileReader.onload = ($event) => {
    imageSelected.src = $event.target.result;
  }
})