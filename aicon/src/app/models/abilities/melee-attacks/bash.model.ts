import {SingleTargetAttack} from "../ability.model";

export class Bash extends SingleTargetAttack{
  name: string = "Bash";
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
