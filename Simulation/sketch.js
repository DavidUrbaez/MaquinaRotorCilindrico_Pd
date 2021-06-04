let img;
let img2;
let factor_data = 1000;
var canvas;

function setup() {
    canvas = createCanvas(800, 480);
    canvas.parent('sketch-holder');

    let adjustx = 0
    let adjusty = 0



    slider_Xs = createSlider(1 * factor_data, 2.45 * factor_data, 2.40 * factor_data);
    slider_Xs.style('width', '190px');
    slider_Xs.position(adjustx + 30, height - 250 + adjusty);
    slider_Xs.parent('sketch-holder');

    slider_Va = createSlider(0.85 * factor_data, 1.25 * factor_data, 1 * factor_data);
    slider_Va.style('width', '190px');
    slider_Va.position(adjustx + 30, height - 180 + adjusty);
    slider_Va.parent('sketch-holder');

    slider_Pd = createSlider(0.6 * factor_data, 1.1 * factor_data, 1 * factor_data);
    slider_Pd.style('width', '190px');
    slider_Pd.position(adjustx + 30, height - 100 + adjusty);
    slider_Pd.parent('sketch-holder');

    slider_Ea = createSlider(1 * factor_data, 2 * factor_data, 1.5 * factor_data);
    slider_Ea.style('width', '500px');
    slider_Ea.position(adjustx + 20, height - 30 + adjusty);
    slider_Ea.parent('sketch-holder');




    img = loadImage('Unal.PNG');

    img2 = loadImage('Minas.png');

}


function draw() {

    background(7, 35, 89);
    image(img, width - 0 - 200 * 0.9, 20, 210 * 0.8, 100 * 0.8);
    image(img2, 30, 20, 140 * 0.8, 100 * 0.8);
    textFont('Georgia');

    textSize(20);
    fill(255);
    // Text
    text('Xs = ', 30, height - 270);
    text('Va = ', 30, height - 190);
    text('Pd = ', 30, height - 110);
    text('Ea =', 160, height - 35);
    //
    textSize(12);
    noStroke();
    fill(155);
    text('Hecho por:', width * 0.8, height * 0.5);
    text('· David Urbaez León', width * 0.77, height * 0.55);

    text('Docente: ', width * 0.81, height * 0.65);
    text('Andres Julian Saavedra Montes', width * 0.745, height * 0.7);

    text('2020', width * 0.83, height * 0.75);
    fill(255);

    textSize(30);
    text('Diagrama Fasorial', width * 1 / 3, height * 1 / 10);
    textSize(10);
    text('Generador Sincrónico (Ra=0 [ohms] - Pd cte)', width * 0.36, height * 0.15);
    textSize(20);

    let Ea_mag = slider_Ea.value() / factor_data;
    let Va_mag = slider_Va.value() / factor_data;
    let Xs = slider_Xs.value() / factor_data;


    let Pd = slider_Pd.value() / factor_data

    let factor = 200


    let Ea_x = sqrt(Ea_mag * Ea_mag - (Pd * Xs / (3 * Va_mag)) * (Pd * Xs / (3 * Va_mag)));

    let v0 = createVector(0, 0);

    let Va = createVector(Va_mag * factor, 0);

    let Ea = createVector(Ea_x * factor, -factor * Pd * Xs / (3 * Va_mag));

    let j = createVector(0, 1);

    let VXa = Ea.copy().sub(Va);
    let factor_corriente = 0.006
    Ia = Ea.copy().sub(Va).div(factor_corriente * factor * Xs).rotate(HALF_PI)



    //Text


    var dis = 95;

    // Texto Xs
    text(nf(Xs, 1, 3), 30 + 50, height - 270);
    text(' ' + char('8736') + ' ' + str(90) + char('176') + ' p.u.', 40 + dis, height - 270);

    // Texto Va
    text(nf(Va_mag, 1, 3), 30 + 50, height - 190);
    text(' ' + char('8736') + ' ' + str(0) + char('176') + ' p.u.', 40 + dis, height - 190);

    // Texto Pd
    text(nf(Pd, 1, 3), 30 + 50, height - 110);
    text('p.u.', 40 + dis, height - 110);

    // Texto de Ea
    text(nf(Ea_mag, 1, 3) + '    ' + angle(createVector(Ea_x * factor, factor * Pd * Xs / (3 * Va_mag))), 160 + 50, height - 35);
    text(char('8736') + '            ' + char('176') + ' p.u.', 170 + dis, height - 35);

    // Texto de corriente
    text('Ia = ' + str(nf(factor_corriente * Ia.mag(), 1, 3)) + '    ' + angle(Ia), width * 0.7, height - 15);
    text(char('8736') + '            ' + char('176') + ' p.u.', width * 0.82, height - 15);
    fill(150);
    text("Corriente Calculada: ", width * 0.7, height - 40)
    fill(255);
    // 


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



function angle(vec) {
    var value = atan(vec.y / vec.x) * 180 / PI;

    return ' ' + str(nf(value, 1, 2))
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