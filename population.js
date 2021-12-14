

function circles(pop_amount, circle_amount) {
    this.pop_amount = pop_amount;
    this.circle_amount = circle_amount;
    this.population = [];
    this.graphics = [];

    this.fitness = new Array(pop_amount).fill(0);
    this.sum = 0;

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
                gr.ellipse(curr.x, curr.y, curr.x_diameter, curr.y_diameter);
            }

            this.graphics[i] = gr;
        }
    }

    this.sing_fitness = function(gr) {

        let fit = 0;

        gr.loadPixels();
        img.loadPixels();

        let total_pixels = width * height * 4;
        let dist;

        for (let p = 0; p < total_pixels; p += 4) {
            dist = colour_distance(gr.pixels[p],  gr.pixels[p+1],  gr.pixels[p+2],  gr.pixels[p+3],
                                   img.pixels[p], img.pixels[p+1], img.pixels[p+2], img.pixels[p+3])

            fit += dist;

        }

        // give more bias to better graphics;
        fit = 1 / (pow(10, 4) * pow(fit, 5));

        gr.updatePixels();
        img.updatePixels();

        return fit;


    }

    this.calc_fitness = function() {
        for (let i = 0; i < this.pop_amount; i++) {
            this.fitness[i] = this.sing_fitness(this.graphics[i]);
            this.sum += this.fitness[i];
        }
    }



    this.reproduce = function() {
        let new_Cpop = new circles(this.pop_amount, this.circle_amount);

        for (let n = 0; n < this.pop_amount; n++) {
            let rand = rand_circ(this.sum);
            let newDNA = this.mutate(rand);

            //console.log(newDNA, rand);

            let gr_rand = createGraphics(width, height);
            let gr_newDNA = createGraphics(width, height);
            let c_rand, c_newDNA, curr_rand, curr_newDNA;

            for (circ_num = 0; circ_num < this.circle_amount; circ_num++) {
                curr_rand = rand[circ_num];
                c_rand = color(curr_rand.colour[0], curr_rand.colour[1], curr_rand.colour[2]);

                curr_newDNA = rand[circ_num];
                c_newDNA = color(curr_newDNA.colour[0], curr_newDNA.colour[1], curr_newDNA.colour[2]);

                gr_rand.noStroke();
                gr_rand.fill(c_rand);
                gr_rand.blendMode(MULTIPLY);
                gr_rand.ellipse(curr_rand.x, curr_rand.y, curr_rand.x_diameter, curr_rand.y_diameter);

                gr_newDNA.noStroke();
                gr_newDNA.fill(c_newDNA);
                gr_newDNA.blendMode(MULTIPLY);
                gr_newDNA.ellipse(curr_newDNA.x, curr_newDNA.y, curr_newDNA.x_diameter, curr_newDNA.y_diameter)
            }



            if (this.sing_fitness(gr_newDNA) > this.sing_fitness(gr_rand)) {

                rand = newDNA;
            }

            new_Cpop.population[n] = rand;
        }

        Cpop = new_Cpop;

    }

    this.mutate = function(cDNA) {
        let newDNA = [];

        for (let i = 0; i < this.circle_amount; i++) {
            newDNA[i] = new circleDNA(cDNA[i].x, cDNA[i].y, cDNA[i].x_diameter,
                cDNA[i].y_diameter, cDNA[i].colour);
        }

        for (let i = 0; i < this.circle_amount; i++) {
            if (random(1) < mutation_rate) {
                newDNA[i].x = floor(random(width));
            }

            if (random(1) < mutation_rate) {
                newDNA[i].y = floor(random(height));
            }

            if (random(1) < mutation_rate) {
                newDNA[i].x_diameter = floor(random(width));
            }

            if (random(1) < mutation_rate) {
                newDNA[i].y_diameter = floor(random(height));
            }

            if (random(1) < mutation_rate) {
                newDNA[i].colour[0] = floor(random(255));
            }

            if (random(1) < mutation_rate) {
                newDNA[i].colour[1] = floor(random(255));
            }

            if (random(1) < mutation_rate) {
                newDNA[i].colour[2] = floor(random(255));
            }
        }

        console.log(newDNA, cDNA);


        return newDNA;
    }

    this.display_best = function() {
        let max = 0;
        let gr = null;
        let idx = null;

        for (let i = 0; i < this.pop_amount; i++) {
            if (this.fitness[i] > max) {
                max = this.fitness[i];
                gr = this.graphics[i];
                idx = i;
            }
        }

        //image(gr, 0, 0)
        //console.log('Best fitness = ' + max);

        if (max > 100) {
            noLoop();
            image(gr, 0, 0);
        }



    }



}


function rand_circ(sum) {
    let idx = 0;
    let r = random(sum);

    while (r > 0) {
        r -= Cpop.fitness[idx];
        idx++;
    }

    idx--;

    return Cpop.population[idx];

}


function colour_distance(r1, g1, b1, a1, r2, g2, b2, a2) {
    let drdr = pow(r2 - r1, 2);
    let dgdg = pow(g2 - g1, 2);
    let dbdb = pow(b2 - b1, 2);
    let dada = pow(a2 - a1, 2);

    let dist = sqrt(drdr + dgdg + dbdb + dada) / 100**4;
    return dist;
}
