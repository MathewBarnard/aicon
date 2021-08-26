import { Injectable } from '@angular/core';
import {AbilityFactory} from "../models/abilities/ability-factory";
import {Ability} from "../models/abilities/ability.model";
import {AbilityType} from "../models/abilities/ability-type.enum";

@Injectable({
  providedIn: 'root',
})
export class AbilityService {

  constructor() { }

  getAbility(abilityType: AbilityType): Ability {
    return AbilityFactory.CreateAbility(abilityType);
  }
}
