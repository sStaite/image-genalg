

function circles(pop_amount, circle_amount) {
    this.pop_amount = pop_amount;
    this.circle_amount = circle_amount;
    this.population = [];
    this.graphics = [];
    this.fitness = new Array(pop_amount).fill(0);

    this.populate = function() {
        for (let i = 0; i < pop_amount; i++) {

            this.population[i] = new Array(circle_amount);

            for (let j = 0; j < circle_amount; j++) {

                let rand_col = [floor(random(255)), floor(random(255)), floor(random(255))];

                this.population[i][j] = new circleDNA(floor(random(width)),
                                                   floor(random(height)),
                                                   floor(random(width)),
                                                   floor(random(height)),
                                                   rand_col);
            }
        }
    }


    this.create_images = function() {

        for (let i = 0; i < this.pop_amount; i++) {
            let curr_pop = this.population[i];
            let gr = createGraphics(width, height);
            let c, curr;

            for (circ_num = 0; circ_num < this.circle_amount; circ_num++) {
                curr = curr_pop[circ_num];
                c = color(curr.colour[0], curr.colour[1], curr.colour[2]);

                gr.noStroke();
                gr.fill(c);
                gr.blendMode(MULTIPLY);
                gr.ellipse(curr.x, curr.y, curr.x_diameter, curr.y_diameter)
            }

            this.graphics[i] = gr;
        }
    }


    this.calc_fitness = function() {

        for (let i = 0; i < this.pop_amount; i++) {
            let gr = this.graphics[i];

            gr.loadPixels();
            img.loadPixels();

            let total_pixels = width * height * 4;
            let dist;

            for (let p = 0; p < total_pixels; p += 4) {
                dist = colour_distance(gr.pixels[p],  gr.pixels[p+1],  gr.pixels[p+2],  gr.pixels[p+3],
                                       img.pixels[p], img.pixels[p+1], img.pixels[p+2], img.pixels[p+3])

                this.fitness[i] += dist;

            }

            gr.updatePixels();
            img.updatePixels();

        }
    }





}



function colour_distance(r1, g1, b1, a1, r2, g2, b2, a2) {
    let drdr = pow(r2 - r1, 2);
    let dgdg = pow(g2 - g1, 2);
    let dbdb = pow(b2 - b1, 2);
    let dada = pow(a2 - a1, 2);

    let dist = sqrt(drdr + dgdg + dbdb + dada);
    return dist;
}
