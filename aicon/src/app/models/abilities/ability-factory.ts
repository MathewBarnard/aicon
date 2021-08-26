import {Ability} from "./ability.model";
import {AbilityType} from "./ability-type.enum";
import {Slash} from "./melee-attacks/slash.model";
import {Bash} from "./melee-attacks/bash.model";
import {Fortify} from "./stance/fortify.model";

export class AbilityFactory {

  static CreateAbility(abilityType: AbilityType): Ability {

    switch(abilityType) {
      case AbilityType.Bash:
        return new Bash();
        break;
      case AbilityType.Slash:
        return new Slash();
        break;
      case AbilityType.Fortify:
        return new Fortify();
        break;
      default: break;
    }
  }
}
