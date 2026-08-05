const canvas = document.getElementById("stars");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

let estrellas=[];

for(let i=0;i<300;i++){

    estrellas.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        r:Math.random()*2,

        o:Math.random()

    });

}

function dibujar(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    estrellas.forEach(e=>{

        ctx.beginPath();

        ctx.arc(e.x,e.y,e.r,0,Math.PI*2);

        ctx.fillStyle="rgba(255,255,255,"+e.o+")";

        ctx.fill();

    });

    requestAnimationFrame(dibujar);

}

dibujar();