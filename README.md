# Brincando com Aprendizado de Máquina

## Conceitos Básicos 

### Regra de correção de erro 

Problema: Ajustar a inclinação da reta para apontar automaticmante para um alvo.

Equação da reta: 
```
y = w*x + b 
```
Aqui a troca de a por w é intecional. O _a_ está relacionado a inclinação da reta, assim como w ao comportamento de saida, y, da função elaborada com a equação da reta. 

A animação para ilustar este problema é composta de um: 

* Um alvo: 
```javascript
function desenhaAlvo(x,y) {
  strokeWeight(1);
  fill(255,250,50);
  ellipse(x,y, 10,100); 
  fill(255,50,50);
  ellipse(x,y, 4,22);  
}
```

* Um "canhão" desenhado a partir da equação da reta:  
```javascript 
  strokeWeight(5);
  line(x1, reta(x1,w,b), x2,reta(x2,w,b) ); 
``` 

* A função que descreve a reta: 
```javascript 
function reta(x,w,b) {
  return (b + x*w); 
}
``` 

A regra de correção de w é composta por uma taxa de aprendizagem, o valor x próximo ao alvo, o cálculo do erro, valor de y desejado (_yAlvo_) menos o valor obtido yd (y da reta próximo ao alvo).   

* Ajuste do peso
```javascript 
w = w + taxaDeAprendizagem*xd*(yAlvo - yd);  
``` 

Código principal da animação: 
```javascript 
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
``` 

Para visualizar a animação acesse o link: 
https://editor.p5js.org/orivaldo@gmail.com/present/rIVcjgi0y

### Perceptron 

Para visualizar a animação do alvo em movimento acesse o link: 
https://editor.p5js.org/orivaldo@gmail.com/present/v8W7zk_Y0
