var img;

function preload() {
    img = loadImage('test.jpg');
}

function setup() {
    createCanvas(img.width, img.height);
    pixelDensity(1);

    // create a new population of circles
    Cpop = new circles(10, 3);

    Cpop.populate();
    //Cpop.make_images();
}

function draw() {

    Cpop.create_images();
    image(Cpop.graphics[0], 0, 0);
    Cpop.calc_fitness();


    noLoop();

}
