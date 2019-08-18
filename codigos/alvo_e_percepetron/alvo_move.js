let yAlvo = 50; 
let xAlvo = 350;
let velAlvo = 0.5; 
let xd = 30; 
let x1 = 0; 
let x2 = 30; 
let w = 0.1; 
let b = 200; 
let taxaDeAprendizagem = 0.002; 
// Entradas 
// posição em Y e a velocidade 
let VX = [];
// pesos 
let VW = [0.0, 0.0];

function reta(x,w,b) {
  return (b + x*w); 
}


function perceptron(entradas,pesos,b) {
  // somatário dos pesos multiplicados pela entrada  entrada   
  let net = 0; 
  for (let i=0; i<pesos.length; i++){
    net = net + entradas[i]*pesos[i]; 
  }
  // ativação
  let resultado = net; 
  if ( net > 0.7 ) {
    resultado = 0.7;       
  }
  else if ( net < -0.7 ) {
    resultado = -0.7;
  }
  return resultado; 
}

function ajusteDosPesos(erro,entradas,pesos){
  
  for (let i=0; i<pesos.length; i++){
    pesos[i] = pesos[i] + taxaDeAprendizagem*entradas[i]*erro;
  }
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
  // alvo 
  desenhaAlvo(xAlvo,yAlvo); 
  yAlvo = yAlvo + velAlvo;
  if (yAlvo > height) 
    yAlvo = 0; 
  // Atualiza a entrada 
  VX[0] = yAlvo/height; // aultura normalizada  
  VX[1] = velAlvo; 
  
  
  // Desenha a reta 
  strokeWeight(5);
  line(x1, reta(x1,w,b), x2,reta(x2,w,b) ); 
  
  // Disparo 
  yd = reta(xd,w,b);
  
  //desenha disparo
  strokeWeight(1);
  fill(10,10,200);
  ellipse(xd,yd,4,4);
  
  xd=xd+8; 
  // Ajuste do peso 
  if (xd > xAlvo ) {
    // calcula o erro 
    let erro = yAlvo - yd; 
    
    // ajusta os pesos 
    if (erro < 250 && erro > -250)
      ajusteDosPesos(erro,VX,VW); 
    
    // Encontra a inclinação da reta com o perceptron 
    w = perceptron(VX,VW,b); 
    //w = w + taxaDeAprendizagem*xd*(yAlvo - yd); 
    xd = x2;
    console.log(w); 
    console.log(VW); 
    console.log(erro); 
    
    
  }
}