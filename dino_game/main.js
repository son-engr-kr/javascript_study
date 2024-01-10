let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


let dino = {
    x : 10,
    y: 200,
    width:50,
    height:50,
    draw(){
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x,this.y, this.width,this.height)
    }
}

dino.draw();
let cactus_list = [];

let cactus_img = new Image();
cactus_img.src = 'images/cactus.png'
class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red'
        // ctx.fillRect(this.x,this.y, this.width,this.height)
        ctx.drawImage(cactus_img, this.x, this.y)
        ctx.width = cactus_img.width
        ctx.height = cactus_img.height
    }
}



let timer = 0;
let is_jumping = false;
let jump_timer = 0;
var animation;
function frameFunction(){
    animation = requestAnimationFrame(frameFunction)
    timer++;
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(timer % 400 === 0){
        let cactus = new Cactus();
        cactus_list.push(cactus)
        
    }
    if(is_jumping == true){
        dino.y -=3;
        jump_timer ++;
    }
    else if(dino.y<200){
        dino.y +=3;
    }
    if(jump_timer > 30){
        is_jumping = false;
        jump_timer = 0;
    }

    cactus_list.forEach((cactus, i, o)=>{
        if(cactus.x < 0){
            o.splice(i, 1)
        }
        cactus.x--;
        // console.log("hello")

        is_collision(dino, cactus)

        cactus.draw();
    })
    
    
    

    dino.draw()
}


frameFunction();

//collision check

function is_collision(dino, cactus){
    let x_diff = cactus.x - (dino.x + dino.width);
    let y_diff = cactus.y - (dino.y + dino.height);
    if(x_diff < 0 && y_diff < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}



document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        is_jumping = true;
    }
})
