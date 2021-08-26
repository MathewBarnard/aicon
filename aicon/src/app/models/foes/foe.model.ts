import {StatBlock} from "../combatants/combatant.model";
import {Deserializable} from "../deserializable.interface";

export class Foe implements Deserializable<Foe> {
  // Base Stats
  Name: string;
  Inherited: boolean;
  Inherits: string;
  Type: string;
  Group: string;
  Health: number[];
  HpMultiplier: number;
  HpMultiplierByPlayers: boolean;
  Speed: number;
  Run: number;
  Dash: number;
  Defense: number;
  Armor: number[];
  Attack: number[];
  FrayDamage: number[];
  LightDamage: number;
  HeavyDamage: number;
  CriticalDamage: number;
  LightDamageDie: string;
  HeavyDamageDie: string;
  CriticalDamageDie: string;
  DamageType: DamageType;
  SetupTraits: Trait[];
  Traits: Trait[];
  Interrupts: Interrupt[];
  Actions: Action[];
  FactionBlight: string;
  BodyParts: BodyPart[];
  PhasesDescription: string;
  Phases: Phase[];

  constructor() {
    this.Health = [];
    this.Armor = [];
    this.Attack = [];
    this.FrayDamage = [];
    this.SetupTraits = [];
    this.Traits = [];
    this.Interrupts = [];
    this.Actions = [];
    this.BodyParts = [];
    this.Phases = [];
  }

  deserialize(input: any): Foe {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, input);
    return this;
  }

  inheritFrom(otherFoe: Foe) {
    const newFoe: Foe = new Foe();
    newFoe.Name = this.Name;
    newFoe.Inherits = this.Inherits;
    newFoe.Type = this.Type;

    // Inherit single values
    if (this.Group != null && this.Group != '') { newFoe.Group = this.Group; } else { newFoe.Group = otherFoe.Group; }
    newFoe.HpMultiplier = this.inheritValue(this.HpMultiplier, otherFoe.HpMultiplier);
    newFoe.Speed = this.inheritValue(this.Speed, otherFoe.Speed);
    newFoe.Run = this.inheritValue(this.Run, otherFoe.Run);
    newFoe.Dash = this.inheritValue(this.Dash, otherFoe.Dash);
    newFoe.Defense = this.inheritValue(this.Defense, otherFoe.Defense);
    newFoe.LightDamage = this.inheritValue(this.LightDamage, otherFoe.LightDamage);
    newFoe.HeavyDamage = this.inheritValue(this.HeavyDamage, otherFoe.HeavyDamage);
    newFoe.CriticalDamage = this.inheritValue(this.CriticalDamage, otherFoe.CriticalDamage);
    newFoe.LightDamageDie = this.inheritValue(this.HeavyDamageDie, otherFoe.HeavyDamageDie);
    newFoe.CriticalDamageDie = this.inheritValue(this.CriticalDamageDie, otherFoe.CriticalDamageDie);
    newFoe.DamageType = this.inheritValue(this.DamageType, otherFoe.DamageType);
    newFoe.FactionBlight = this.inheritValue(this.FactionBlight, otherFoe.FactionBlight);

    // Replace chapter arrays
    for (let i = 0; i < 3; i++)
    {
      newFoe.Health[i] = this.inheritValue(this.Health[i], otherFoe.Health[i]);
      newFoe.Armor[i] = this.inheritValue(this.Armor[i], otherFoe.Armor[i]);
      newFoe.Attack[i] = this.inheritValue(this.Attack[i], otherFoe.Attack[i]);
      newFoe.FrayDamage[i] = this.inheritValue(this.FrayDamage[i], otherFoe.FrayDamage[i])
    }

    newFoe.Traits = this.Traits.concat(otherFoe.Traits);
    newFoe.SetupTraits = this.SetupTraits.concat(otherFoe.SetupTraits);
    newFoe.Interrupts = this.Interrupts.concat(otherFoe.Interrupts);
    newFoe.Actions = this.Actions.concat(otherFoe.Actions);
    newFoe.BodyParts = this.BodyParts.concat(otherFoe.BodyParts);

    for (let i = 0; i < newFoe.Traits.length; i++) {
      let statName = newFoe.Traits[i].Name.toLowerCase();
      for (let j = i + 1; j < newFoe.Traits.length; ++j) {
        let otherStatName = newFoe.Traits[j].Name.toLowerCase();
        if (statName === otherStatName) {
          newFoe.Traits.splice(j, 1);
        }
      }
    }

    return newFoe;
  }

  inheritValue(currentValue, inheritedValue) {
    if (currentValue || currentValue === 0) {
      return currentValue;
    } else {
      return inheritedValue;
    }
  }
}

export class BodyPart {
  Name: string;
  HP: number;
  Description: string;
}


export class Phase {
  Name: string;
  Description: string;
  Traits: Trait[];
  Actions: Action[];
}

export class Trait {
  Name: string;
  Tags: string[];
  Description: string;
  AddHp: number;
  AddArmor: number;
  MaxArmor: number;
  NoRun: boolean;
  NoDash: boolean;
  Nonessential: boolean;
}

export class Interrupt {
  Name: string;
  Count: number;
  Tags: string[];
  Description: string;
}

export class Action {
  Name: string;
  ActionCost: number;
  Tags: string[];
  Description: string;
  Hit: string;
  CriticalHit: string;
  Miss: string;
  AreaEffect: string;
  Effect: string;
  Collide: string;
  BlightBoost: Blight[];
  Combos: Action[];
}

export enum DamageType {
  Physical,
  Magical
}

export enum Blight {

}
