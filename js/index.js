let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let animateId = null;
let carImg = new Image();
carImg.src = './images/car.png'; //Loads the car
let newLevel = false;
let lightCounter = 0;
let lightSwitch = false;
let lightTime = 100;
let canMove = true;
let stageCounter = 0;
let direction = ''

var object = {
  x: Math.floor(Math.random()*550 + 50),
  y: Math.floor(Math.random()*200 + 50),
  w: 30,
  h: 100
}

let obstacle = []

var win = {
  x: 650,
  y: Math.floor(Math.random()*400 + 50),
  w: 50,
  h: 50,
  type: 'win'
}

var car = {
  //This is your car object
  x: 0,
  y: 0,
  w: 50,
  h: 50,
  image: carImg,
};

function createObstacles() {
  for(i=0; i<3; i++)
  {
    let obs = {
      x: 200 + 100*i,
      y: Math.floor(Math.random()*50 + 250*(i%2)),
      w: 30,
      h: 200
    }
    obstacle.push(obs)
  }
}

function deleteObstacle(index)
{
  obstacle.splice(index,1)
}

function borders(obj) {
  ctx.fillStyle = 'red';
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}

function winningShade() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(win.x, win.y, win.w, win.h);
}

function lightsOff() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 700, 500);
}

function drawCanvas() {
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 700, 500);
}

function drawCar() {
  ctx.drawImage(car.image, car.x, car.y, car.w, car.h);
}

function detectMove(move) {
  if(move)
  {
    switch(direction) {
      case 'left':
        if (car.x <= 0) {
          console.log('Border');
        } else {
          car.x -= 5;
        }
        break;
      case 'right':
        if (car.x === 650) {
          console.log('Border');
        } else {
          car.x += 5;
        }
        break;
      case 'up':
        if (car.y <= 0) {
          console.log('Border');
        } else {
            car.y -= 5;
        }
        break;
      case 'down':
        if (car.y === 450) {
          console.log('Border');
        } else {
          car.y += 5;
        }
        break;
      
    }

  }
}

document.body.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38:
      direction = 'up'
      break;
    case 40:
      direction = 'down'
      break;
    case 37:
      // left
      direction = 'left'
      break;

    case 39:
      //right
      direction = 'right'
      break;
    default:
      break;
  }
};


function detectCollision(obs) {
  // obs.map((obj) => {
  var a = { x: obs.x, y: obs.y, width: obs.w, height: obs.h }; //Our obstacles
  var b = { x: car.x, y: car.y, width: car.w, height: car.h }; //Our car
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    // collision detected!
  
    switch(direction)
    {
      case 'left':
        if (car.x <= 0) {
          console.log('Border');
        } else {
          car.x += 5;
        }
        break;
      case 'right':
        if (car.x === 650) {
          console.log('Border');
        } else {
          car.x -= 5;
        }
        break;
      case 'up':
        if (car.y <= 0) {
          console.log('Border');
        } else {
            car.y += 5;
        }
        break;
      case 'down':
        if (car.y === 450) {
          console.log('Border');
        } else {
          car.y -= 5;
        }
        break;
    }  
  }
  // });
}

function detectWin() {
  var a = { x: 699, y: win.y+25, width: 1, height: 1 }; //Our obstacles
  var b = { x: car.x, y: car.y, width: car.w, height: car.h }; //Our car
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    // collision detected!
      newLevel = true;
      win.w = 0;
      win.h = 0;
  }
}

function startGame() {
  ctx.clearRect(0, 0, 700, 500);

  drawCanvas();
  for(i=0;i<obstacle.length;i++)
  {
    borders(obstacle[i]);
  }
  winningShade();
  if (lightCounter % lightTime === lightTime-1) {
    lightSwitch = !lightSwitch;
  }

  if (lightSwitch) {
    lightsOff();
    lightTime = 500;
    
    detectWin();
    detectMove(canMove);
    for(i=0;i<obstacle.length;i++)
    {
      detectCollision(obstacle[i])
    }
    direction = ''
  } else {

    lightTime = 100;
  }

  lightCounter++;

  drawCar();
  
  if(newLevel)
  {
    lightSwitch = false
    lightCounter = 0
    //clear obstacle array
    for(i=0;i<obstacle.length;i++)
    {
      deleteObstacle(i)
    }
    canMove = false
    if(car.x > 0)
    {
      car.x -= 10
    }
    else
    {
      //create new obstacle array
      createObstacles();
      canMove = true
      newLevel = false
      win.y = Math.floor(Math.random()*400 + 50)
      win.h = 50
      win.w = 50
      
      lightCounter = 0;
    }
  }
  
  
  
  animateId = window.requestAnimationFrame(startGame); //Game rendering -infinite loop that goes super fast
}

window.onload = () => {
  createObstacles();
  startGame();
};

