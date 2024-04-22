import { Spirit } from "./Spirit";

export interface Spec {
    id:         number;
    spiritId:   number;
    ounces:     string;
    cocktailId: number;
    spirit:     Spirit;
  }