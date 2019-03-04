import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
function Circle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
}

Circle.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}

Circle.prototype.update = function() {
    this.draw()
}

function getDistance(x1,y1,x2,y2){
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance,2)+ Math.pow(yDistance,2));
}

// Implementation
let circle1;
let circle2;

function init() {
    circle1 = new Circle(800,500,100,'black');
    circle2 = new Circle(undefined,undefined,40,'red');
    //objects = []

    /*for (let i = 0; i < 400; i++) {
        // objects.push()
    }*/
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    // objects.forEach(object => {
      circle1.update();
      circle2.x = mouse.x;
      circle2.y = mouse.y;
      circle2.update();
      if(getDistance(circle1.x,circle1.y,circle2.x,circle2.y) < circle1.radius+circle2.radius){
        circle1.color = 'red';
      console.log("hi");
  }else {
    circle1.color = 'black';
  }
    // })
}

init()
animate()
