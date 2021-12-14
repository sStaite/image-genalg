var img;
var generation;

var mutation_rate = 0.10;
var num_pop = 1;
var num_circs = 3;

function preload() {
    img = loadImage('test.jpg');
}

function setup() {
    createCanvas(img.width, img.height);
    pixelDensity(1);

    // create a new population of circles
    Cpop = new circles(num_pop, num_circs);

    Cpop.populate();
    //Cpop.make_images();
    generation = 1;
}

function draw() {
    background(255);

    //console.log('Generation ' + generation);

    Cpop.create_images();
    Cpop.calc_fitness();

    Cpop.display_best();

    Cpop.reproduce();

    generation++;
}
