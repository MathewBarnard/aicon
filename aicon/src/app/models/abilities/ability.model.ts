import {Combatant} from "../combatants/combatant.model";

export class Ability {
  name: string;
  description: string;
}

export class SingleTargetAttack extends Ability {
  source: Combatant;
  target: Combatant;
  onHit: Function;
  onMiss: Function;
}

export class Stance extends Ability {
  source: Combatant;
  onActivate: Function;
  active: Function;
  onDeactivate: Function;
}

export interface IAbilityStep {
  process();
}


