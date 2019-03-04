import {randomIntFromRange,randomColor} from './utils.js'

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

function getDistance(x1,y1,x2,y2){
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance,2)+ Math.pow(yDistance,2));
}

// Objects
function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity={
        x: Math.random() -0.5,
        y: Math.random() - 0.5
    }
    this.radius = radius;
    this.color = color;
}


Circle.prototype.update = circleArr => {
    console.log(circleArr);
    console.log(this);
    this.draw();

    for (let i = 0; i < circleArr.length; i++) {
        console.log(i+circleArr[i].y);
        
       if(this === circleArr[i]) continue;
            if(getDistance(this.x,this.y,circleArr[i].x,circleArr[i].y) - (this.radius* 2 ) < 0){
                console.log("particles has collided!!");
            }
    }
    this.x +=this.velocity.x;
    this.y +=this.velocity.y;
    
}

Circle.prototype.draw = () => {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //c.fillStyle = this.color
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath()
}



// Implementation
let circles;
//let circle2;
let circleArr;
function init() {
    
    circleArr = [];
    for (var i = 0; i <= 4; i++) {
        let radius = 100;
        let x = randomIntFromRange(radius,canvas.width - radius);
        let y = randomIntFromRange(radius,canvas.height - radius);
        
        if(i!==0){
           // console.log("hi");
            for (let j = 0; j < circleArr.length; j++) {
               
                if(getDistance(x,y,circleArr[j].x,circleArr[j].y) - (radius* 2 ) < 0){

                    
                     x = randomIntFromRange(radius,canvas.width - radius);
                    y = randomIntFromRange(radius,canvas.height - radius);
                     j = -1;   
                }
            }
        }
    circleArr.push(new Circle(x,y,radius,'black'));

    }
   // console.log(circleArr);

}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    circleArr.forEach(circle=>{
       console.log("before :"+circle.x);
        circle.update(circleArr);
    })
}

init()
animate()
