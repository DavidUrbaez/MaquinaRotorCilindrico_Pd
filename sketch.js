function setup() {
  createCanvas(800, 500);

  slider = createSlider(0, 300, 150);
  slider.position(150, height-30);
  slider.style('width', '500px');

}


function draw() {
  background(7,35,89);
  textFont('Georgia');
  textSize(20);
  fill(255);
  text('Pd',200, height-30);

  let val = slider.value()
  
  translate(width / 3, height / 2);
  
  
    

  
  let Xs = 1.5;
  let v0 = createVector(0, 0);
  
  let Ea = createVector(50+val,-200);
  let Va = createVector(200, 0);
  let j = createVector(0, 1);
  
  let Ia=Ea.copy().sub(Va).div(Xs).rotate(HALF_PI)

  
  
  drawArrow(v0, Ea,[68,175,242]);
  
  text('Ea',Ea.x/2, Ea.y/2);
  
  drawArrow(v0, Va,[8,105,166]);
  
  text('Va',Va.x/2, Va.y/2);
  
  drawArrow(v0, Ia,[93,228,227]);

  text('Ia',Ia.x/2, Ia.y/2);
  
  
  drawingContext.setLineDash([10, 15]);
  let maxLine=200
  stroke(100);
  line(0,maxLine,0,-maxLine);
  line(Va.x/Xs,maxLine,Va.x/Xs,-maxLine);
  stroke([0,203,231]);
  line(0,Ea.y,400,Ea.y);
  stroke(0);
  drawingContext.setLineDash([]);
  
  

  console.log(Va.x)
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