
function x(event) {
	picture.src = URL.createObjectURL(event.target.files[0]);
};

picture.ondragover = function(e2) {
      e2.preventDefault();
    };
  
picture.ondrop = function(e3) {
    var items = e3.dataTransfer.items;
    e3.preventDefault();
    
    if (items[0].type.indexOf('image/') === 0) {
    picture.src = URL.createObjectURL(items[0].getAsFile());
    }
}

var imgData;
picture.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  let nw = this.naturalWidth;   //1350
  let nh = this.naturalHeight;  //900
  canvas.width = nw;
  canvas.height = nh;
  let aspect = nw / nh;
  this.height = this.width / aspect;


  ctx.drawImage(this, 0, 0);
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // invert colors
  var i;
  for (i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i] = 255 - imgData.data[i];
    imgData.data[i+1] = 255 - imgData.data[i+1];
    imgData.data[i+2] = 255 - imgData.data[i+2];
    imgData.data[i+3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);

// DATAURL: Actual image generation via data url

target.src = canvas.toDataURL();
target.width = this.width;
target.height = this.height;
target.style.border='2px solid black';
document.getElementById('result').appendChild(target);

};
