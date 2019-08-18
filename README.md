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

O perceptron foi uma das primeiras implementações bem sucedida de um neurônio artificial. 

Esta seção apresenta como o perceptron pode ser implementado como solução para o problema de acertar um alvo em movimento constante no eixo _y_ em uma distância fixa no eixo _x_. 

O perceptron é construído basicamente de um conjunto de entrada, um conjuto de pesos, uma soma ponderada (pesos vezes entradas) e uma função de ativação.

Figura ilustrando o preceptron obtida no site: https://towardsdatascience.com 
![Image do perceptron](https://miro.medium.com/max/1838/1*n6sJ4yZQzwKL9wnF5wnVNg.png =400x)

Em código fica:
```javascript
function perceptron(entradas,pesos) {
  // somatário dos pesos multiplicados pela entrada    
  let soma = 0; 
  for (let i=0; i<pesos.length; i++){
    soma = soma + entradas[i]*pesos[i]; 
  }
  // ativação
  return ativacao(soma); 
}
```

A função de ativação foi personalizada para o problema do alvo em movimento acima descrito. 
```javascript
function ativacao(net) {
  let resultado = net; 
  if ( net > 0.7 ) {
    resultado = 0.7;       
  }
  else if ( net < -0.7 ) {
    resultado = -0.7;
  }
  return resultado;   
}
```

A modelagem da solução tem como base encontrar a inclinação do canhão (coeficiente de inclinação da reta). Como o alvo tem um movimento restrito a uma distância fixa _x_ do canhão, então os valores máximo e mínimo da inclinação do canhão devem sempre apontar para área prevista para a movimentação do alvo. Desta restrição surge os valores 0.7 e -0.7 como limites ou saturação para a função de ativação. 

O código da regra de aprenizagem também fica simples. A função de ajuste dos pesos recebe o erro, os valores de entrada e os pesos a serem corrigidos. 
```javascript
function ajusteDosPesos(erro,entradas,pesos){
  for (let i=0; i<pesos.length; i++){
    pesos[i] = pesos[i] + taxaDeAprendizagem*entradas[i]*erro;
  }
}
```

A regra de ajuste dos pesos calcula o novo valor de cada peso considerando o peso anterior somando com uma taxa de aprendizagem multiplicada pela respectiva entrada associada ao peso, vezes o erro. O erro, neste problema, é o valor desejado (posição y do alvo) menos o valor calculado (posição y que a bala do canhão atinge o alvo), ver o código: 
```javascript
// calcula o erro 
    let erro = yAlvo - yd; 
```

O código principal está abaixo. O ajuste de peso acontece quando a bala do canhão atinge o alvo (_xd > xAlvo_).
```javascript
  background(230);
  // alvo 
  desenhaAlvo(xAlvo,yAlvo); 
  yAlvo = yAlvo + velAlvo;
  if (yAlvo > height) 
    yAlvo = 0; 
  
  // Atualiza a entrada 
  VX[0] = yAlvo/height; // aultura normalizada  
  VX[1] = velAlvo; 
  
  // Desenha a reta / canhão 
  strokeWeight(5);
  line(x1, reta(x1,a,b), x2,reta(x2,a,b) ); 
  
  // Disparo 
  yd = reta(xd,a,b);
  xd=xd+8; 
  
  //desenha disparo
  strokeWeight(1);
  fill(10,10,200);
  ellipse(xd,yd,4,4);
  
  // Ajuste do peso 
  if (xd > xAlvo ) {
    // calcula o erro 
    let erro = yAlvo - yd; 
    // ajusta os pesos 
    if (erro < 250 && erro > -250)
      ajusteDosPesos(erro,VX,VW); 
    // Encontra a inclinação da reta com o perceptron 
    a = perceptron(VX,VW); 
    // posiciona a bala no canhão novamente 
    xd = x2;
  }
```

Para visualizar a animação do alvo em movimento acesse o link: 
https://editor.p5js.org/orivaldo@gmail.com/present/v8W7zk_Y0
