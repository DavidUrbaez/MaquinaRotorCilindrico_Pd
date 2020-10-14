function setup() {
  createCanvas(800, 500);

  slider_Pd = createSlider(0, 300, 150);
  slider_Pd.style('width', '500px');
  slider_Pd.position(20,height-30);
  
  slider_Xs = createSlider(1*100, 3*100, 1.5*100);
  slider_Xs.style('width', '80px');
  slider_Xs.position(40,height-100);
  
  
}


function draw() {

  background(7,35,89);
  textFont('Georgia');
  textSize(20);
  fill(255);
  text('Pd',200, height-30);
  text('Xs',70, height-110);
  
  textSize(12);
  text('Hecho por: David Urbaez León - 2020',width*3.5/5, height*19/20);
  
  textSize(30);
  text('Diagrama Fasorial',width*1/3, height*1/10);
  textSize(10);
  text('Generador Sincrónico (Ra=0)',width*0.4, height*0.15);
  textSize(20);
  let val = slider_Pd.value()
  
  translate(width /3, height *0.6);
  
  
    

  
  let Xs = slider_Xs.value()/100
  let v0 = createVector(0, 0);
  
  let Ea = createVector(150+val-Xs*20,-200);
  let Va = createVector(200, 0);
  let j = createVector(0, 1);
  
  let VXa = Ea.copy().sub(Va);
  
  let Ia=Ea.copy().sub(Va).div(Xs*1/0.6).rotate(HALF_PI)

  
    
  drawArrow(Va,VXa,150);
  
  text('VXa',VXa.x/2+Va.x, VXa.y/2);
  
  drawArrow(v0, Ea,[68,175,242]);
  
  text('Ea',Ea.x/2, Ea.y/2);
  
  drawArrow(v0, Va,[8,105,166]);
  
  text('Va',Va.x/2, Va.y/2);
  
  drawArrow(v0, Ia,[93,228,227]);

  text('Ia',Ia.x/2, Ia.y/2);

  
  drawingContext.setLineDash([10, 15]);
  let maxLine=100
  stroke(100);
  line(0,maxLine,0,-maxLine);
  line(Ia.x,maxLine,Ia.x,-maxLine);
  stroke([0,203,231]);
  line(0,Ea.y,400,Ea.y);
  stroke(0);
  drawingContext.setLineDash([]);
  

  console.log("Hecho por David Urbaez León")
}








function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
