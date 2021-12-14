

function circleDNA(x, y, x_diameter, y_diameter, colour) {
    this.x = x;
    this.y = y;
    this.x_diameter = x_diameter;
    this.y_diameter = y_diameter;
    this.colour = colour;


    this.covers = function(pixel_x, pixel_y) {

        let xx = pow(this.x - pixel_x, 2) / pow(this.x_diameter / 2, 2);
        let yy = pow(this.y - pixel_y, 2) / pow(this.y_diameter / 2, 2);

        if (xx + yy < 1) {
            return true;
        } else {
            return false;
        }
    }
}
