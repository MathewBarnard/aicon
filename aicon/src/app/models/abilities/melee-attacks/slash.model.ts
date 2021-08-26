import {SingleTargetAttack} from "../ability.model";

export class Slash extends SingleTargetAttack{
  name: string = "Slash";
  description: string = "On hit, deal light damage. On miss, deal fray damage.";
  constructor() {
    super();
    this.onHit = () => {
      //
    }
    this.onMiss = () => {

    }
  }
}
