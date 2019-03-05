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

// Objects
function Circle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity={
        x: Math.random() + 0.5,
        y: Math.random() + 0.5
    }
    this.color = color;

    this.update = circleArr => {
    this.draw();


    for(let i = 0; i < circleArr.length; i++){
            if(this === circleArr[i]) continue;
            if(getDistance(this.x,this.y,circleArr[i].x,circleArr[i].y) - (this.radius* 2 ) < 0){
                console.log("has collided");
            }

        }
        if(this.x +this.radius > canvas.width || this.x -this.radius < 0){
            this.velocity.x = -this.velocity.x;
        }
         if(this.y +this.radius > canvas.height || this.y -this.radius < 0){
            this.velocity.y = -this.velocity.y;
        }
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
    }


    this.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //c.fillStyle = this.color
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath()
    }

}


Circle.prototype.update = circleArr  => {
    //this.draw();

}

function getDistance(x1,y1,x2,y2){
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance,2)+ Math.pow(yDistance,2));
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
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    circleArr.forEach(circle=>{
        circle.update(circleArr);
    })
}

init()
animate()
