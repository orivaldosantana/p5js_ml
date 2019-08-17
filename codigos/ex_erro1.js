let yAlvo = 50; 
let xAlvo = 350; 
let xd = 30; 
let x1 = 0; 
let x2 = 30; 
let w = 0.5; 
let b = 200; 
let taxaDeAprendizagem = 0.00001; 

function reta(x,w,b) {
  return (b + x*w); 
}

function desenhaAlvo(x,y) {
  strokeWeight(1);
  fill(255,250,50);
  ellipse(x,y, 10,100); 
  fill(255,50,50);
  ellipse(x,y, 4,22);  
}

function setup() {
  createCanvas(400, 400);
  frameRate(30); 
  yAlvo = random(0,400); 
}

function draw() {
  background(230);
  // Desenha a reta 
  strokeWeight(5);
  line(x1, reta(x1,w,b), x2,reta(x2,w,b) ); 
  
  // alvo 
  desenhaAlvo(xAlvo,yAlvo); 
  
  // Disparo 
  yd = reta(xd,w,b);
  
  //desenha disparo
  fill(10,10,200);
  ellipse(xd,yd,4,4);
  
  xd=xd+4; 
  // Ajuste do peso 
  if (xd > xAlvo ) {
    w = w + taxaDeAprendizagem*xd*(yAlvo - yd); 
    xd = x2; 
    console.log(yAlvo - yd);
  }
}