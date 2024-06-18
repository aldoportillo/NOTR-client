export interface Beverage {
    id?: number;
    verified: boolean;
    name: string;
    abv: number;
    ounces: number;
    upc_code: string;
    flavors?: string;
    calories?: number;
    ethanol?: number;
    fat?: number;
    carb?: number;
    sugar?: number;
    added_sugar?: number;
    protein?: number;
    creator_id?: string;
}
