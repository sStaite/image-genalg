

function preload() {
  img = loadImage('test.jpg');
}

function setup() {
    createCanvas(img.width, img.height);

    // create a new population of circles
    Cpop = new circles(10, 3);

    Cpop.populate();
    console.log(Cpop);
}

function draw() {

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 3; j++) {
            let curr = Cpop.population[i][j]
            let c = color(curr.colour[0], curr.colour[1], curr.colour[2]);
            noStroke();
            fill(c);
            circle(curr.x, curr.y, curr.radius * 2);
        }
    }

}
