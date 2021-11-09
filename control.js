var context, controller, rectangle, loop;

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
//c.canvas.height = 500;
//c.canvas.width = 750;

function spriteAnimator(imgCount,x,y,width,height,src){
  this.imgCount = imgCount;
  this.src = src;
  this.x = x;
  this.y = y;
  this.width = width;
  this.i = 1;
  this.height = height; 
  this.imagesStack = [];
  for(var i=1; i<this.imgCount; i++){
    this.imagesStack[i] = new Image();
    this.imagesStack[i].src = this.src + '('+i+').png';
  }
}

rectangle = {

  height:50,
  jumping:true,
  width:50,
  x:500, // center of the canvas
  x_velocity:0,
  y:400,
  y_velocity:0

};

controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 65:// left key
        controller.left = key_state;
      break;
      case 87:// up key
        controller.up = key_state;
      break;
      case 68:// right key
        controller.right = key_state;
      break;

    }

  }

};

var zombie = new spriteAnimator(8,rectangle.x,rectangle.y,rectangle.width,rectangle.height,'sprite/Walk ');

spriteAnimator.prototype.draw = function(c){
  this.i += 1;
  if (this.i > (this.imgCount -1)){
    this.i = 1;}
    if (controller.right == true || controller.left == true){
  c.drawImage(this.imagesStack[this.i],rectangle.x,rectangle.y,rectangle.width,rectangle.height);
} else {
  c.drawImage(this.imagesStack[3],rectangle.x,rectangle.y,rectangle.width,rectangle.height);
}
};



function draw(c){
    c.beginPath();
    c.clearRect(0,0, c.canvas.width, c.canvas.height);
    this.i += 1;
  if (this.i > (this.imgCount -1)){
    this.i = 1;}
  zombie.draw(c);
    c.closePath();
}

function loop(){

  if (controller.up && rectangle.jumping == false) {

    rectangle.y_velocity -= 20;
    rectangle.jumping = true;

  }

  if (controller.left) {

    rectangle.x_velocity -= 0.5;

  }

  if (controller.right) {

    rectangle.x_velocity += 0.5;

  }

  if(rectangle.x < 0 + rectangle.width-50){
      controller.left = false;
      rectangle.x_velocity *= -1;
  }

    if(rectangle.x > canvas.width - rectangle.width){
      controller.right = false;
      rectangle.x_velocity *= -1;
  }

  rectangle.y_velocity += 1.5;// gravity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9;// friction
  rectangle.y_velocity *= 0.9;// friction

  // if rectangle is falling below floor line
  if (rectangle.y > 500 - 16 - 32) {

    rectangle.jumping = false;
    rectangle.y = 500 - 16 - 32;
    rectangle.y_velocity = 0;
  
  }
  draw(c);
  window.requestAnimationFrame(loop);
}
  

//c.drawImage("sprite/Walk (4).png",this.x,this.y,this.width,this.height);
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
//setInterval(loop, 90)
window.requestAnimationFrame(loop);