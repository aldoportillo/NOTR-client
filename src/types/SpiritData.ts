export interface SpiritData {
    id?:                string;
    name:               string;
    type:               Type;
    calories:           number;
    ethanol:            number;
    fat:                number;
    carb:               number;
    sugar:              number;
    addedsugar:         number;
    protein:            number;
    abv:                number;
    sugarconcentration: number;
    acid:               number;
}

enum Type {
    Bitters = "bitters",
    Cordials = "cordials",
    Extras = "extras",
    Juice = "juice",
    Spirit = "spirit",
    Syrup = "syrup",
    Vermouth = "vermouth",
  }