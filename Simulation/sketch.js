let img;
let img2;
let factor_data = 100;

function setup() {
  createCanvas(800, 500);
  let adjustx = 200
  let adjusty = 25 * 2



  slider_Xs = createSlider(1 * factor_data, 2.45 * factor_data, 2.40 * factor_data);
  slider_Xs.style('width', '80px');
  slider_Xs.position(adjustx + 40, height - 250 + adjusty);

  slider_Va = createSlider(0.85 * factor_data, 1.25 * factor_data, 1 * factor_data);
  slider_Va.style('width', '80px');
  slider_Va.position(adjustx + 40, height - 180 + adjusty);


  slider_Ea = createSlider(1 * factor_data, 2 * factor_data, 1.5 * factor_data);
  slider_Ea.style('width', '500px');
  slider_Ea.position(adjustx + 20, height - 30 + adjusty);

  slider_Pd = createSlider(0.6 * factor_data, 1.1 * factor_data, 1 * factor_data);
  slider_Pd.style('width', '80px');
  slider_Pd.position(adjustx + 40, height - 100 + adjusty);


  img = loadImage('https://raw.githubusercontent.com/DavidUrbaez/MaquinaRotorCilindrico_Pd/gh-pages/Simulation/Unal.PNG');

  img2 = loadImage(' https://raw.githubusercontent.com/DavidUrbaez/MaquinaRotorCilindrico_Pd/gh-pages/Simulation/Minas.png');

}


function draw() {

  background(7, 35, 89);
  image(img, width - 0 - 200 * 0.9, 20, 210 * 0.8, 100 * 0.8);
  image(img2, 30, 20, 140 * 0.8, 100 * 0.8);
  textFont('Georgia');

  textSize(20);
  fill(255);
  // Text
  text('Xs = ', 40, height - 270);
  text('Va = ', 40, height - 190);
  text('Pd = ', 40, height - 110);
  text('Ea =', 170, height - 35);
  //
  textSize(12);

  text('Hecho por:', width * 3.9 / 5, height * 11.5 / 20);
  text('· David Urbaez León', width * 3.7 / 5, height * 12.5 / 20);
  text('· Juan Camilo Jiménez Cardona', width * 3.7 / 5, height * 13.5 / 20);
  text('· Angel Ricardo Marin Restrepo', width * 3.7 / 5, height * 14.5 / 20);
  text('· Jose Jesus Pacheco', width * 3.7 / 5, height * 15.5/ 20);
  
    text('Docente: ', width * 4 / 5, height * 17 / 20);
    text('· Andres Julian Saavedra Montes', width * 3.7 / 5, height * 18 / 20);

text('2020', width *4.1 / 5, height * 19 / 20);


  textSize(30);
  text('Diagrama Fasorial', width * 1 / 3, height * 1 / 10);
  textSize(10);
  text('Generador Sincrónico (Ra=0 [ohms] - Pd cte)', width * 0.36, height * 0.15);
  textSize(20);

  let Ea_mag = slider_Ea.value() / factor_data;
  let Va_mag = slider_Va.value() / factor_data;
  let Xs = slider_Xs.value() / factor_data;


  let Pd = slider_Pd.value() / 100

  let factor = 200


  let Ea_x = sqrt(Ea_mag * Ea_mag - (Pd * Xs / (3 * Va_mag)) * (Pd * Xs / (3 * Va_mag)));

  //Text
  text(nf(Xs, 1, 2), 40 + 50, height - 270);
  text(nf(Va_mag, 1, 2), 40 + 50, height - 190);
  text(nf(Pd, 1, 2), 40 + 50, height - 110);
  text(nf(Ea_mag, 1, 2), 170 + 50, height - 35);

  var dis = 95;
  text('p.u.', 40 + dis, height - 270);
  text('p.u.', 40 + dis, height - 190);
  text('p.u.', 40 + dis, height - 110);
  text('p.u.', 170 + dis, height - 35);

  //



  let v0 = createVector(0, 0);

  let Va = createVector(Va_mag * factor, 0);

  let Ea = createVector(Ea_x * factor, -factor * Pd * Xs / (3 * Va_mag));

  let j = createVector(0, 1);

  let VXa = Ea.copy().sub(Va);
  let factor_corriente = 0.006
  Ia = Ea.copy().sub(Va).div(factor_corriente * factor * Xs).rotate(HALF_PI)

  //text('Ia = '+str(nf(factor_corriente*Ia.mag(),1,2))+' p.u.',width*2/3, height*0.8);

  translate(width / 3, height * 0.6);

  drawArrow(Va, VXa, 150);

  text('VXa', VXa.x / 2 + Va.x, VXa.y / 2);

  drawArrow(v0, Ea, [68, 175, 242]);

  text('Ea', Ea.x / 2, Ea.y / 2);

  drawArrow(v0, Va, [8, 105, 166]);

  text('Va', Va.x / 2, Va.y / 2);

  drawArrow(v0, Ia, [93, 228, 227]);

  text('Ia', Ia.x / 2, Ia.y / 2);


  drawingContext.setLineDash([10, 15]);
  let maxLine = 100
  stroke(100);
  line(0, maxLine, 0, -maxLine);
  line(Ia.x, maxLine, Ia.x, -maxLine);
  stroke([0, 203, 231]);
  line(0, Ea.y, 400, Ea.y);
  stroke(0);
  drawingContext.setLineDash([]);


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