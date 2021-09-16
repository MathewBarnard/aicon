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
  Burning,
  Electrified,
  Frostbite,
  Poisoned
}
