

function circles(pop_amount, circle_amount) {
    this.pop_amount = pop_amount;
    this.circle_amount = circle_amount;
    this.population = [];

    this.populate = function() {
        for (let i = 0; i < pop_amount; i++) {

            this.population[i] = new Array(circle_amount);

            for (let j = 0; j < circle_amount; j++) {

                let rand_col = [floor(random(255)), floor(random(255)), floor(random(255))];

                let max_side = Math.max(width, height)

                this.population[i][j] = new circleDNA(floor(random(width)),
                                                   floor(random(height)),
                                                   floor(random(max_side) / 2),
                                                   rand_col);
            }
        }
    }



}
