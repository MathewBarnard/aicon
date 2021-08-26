import {Stance} from "../ability.model";

export class Fortify extends Stance {
  name: string = "Fortify";
  description: string = "On hit, deal light damage. On miss, deal fray damage.";
}
