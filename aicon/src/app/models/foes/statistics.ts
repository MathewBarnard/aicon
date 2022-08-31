import {Deserializable} from '../deserializable.interface';
import {input} from "@aws-amplify/ui";

export class Statistics implements Deserializable<Statistics> {

  // Does Not Inherit
  name: string;
  displayName: string;
  type: string;

  inherits: string[];

  chapter: number;
  usesTemplate: boolean;

  removeTraits: string[];
  removeSetupTraits: string[];
  removeInterrupts: string[];
  removeActions: string[];
  removeUsesSpecialTemplates: string[];

  // Normal Inheritance
  faction: string;
  class: string;
  specialClass: string;
  vitality: number;
  hp: number;
  hpText: string;
  hpMultiplier: number;
  hpMultiplierByPlayers: number;
  speed: number;
  dashMultiplier: number;
  defense: number;
  frayDamage: number;
  damageDie: number;
  rechargeMin: number;

  bodyParts: BodyPartData[];
  phases: PhaseData[];
  extraAbilitySets: AbilitySetData[];
  usesSpecialTemplates: string[];
  conditionalAbilities: ConditionalAbilityData[];
  traits: string[];
  actualTraits: TraitData[];
  setupTraits: TraitData[];
  interrupts: InterruptData[];
  actions: ActionData[];

  constructor() {
    this.inherits = [];
    this.removeTraits = [];
    this.removeSetupTraits = [];
    this.removeInterrupts = [];
    this.removeActions = [];
    this.removeUsesSpecialTemplates = [];
    this.extraAbilitySets = [];
    this.usesSpecialTemplates = [];
    this.conditionalAbilities = [];
    this.traits = [];
    this.actualTraits = [];
    this.setupTraits = [];
    this.interrupts = [];
    this.actions = [];
  }

  // tslint:disable-next-line:no-shadowed-variable
  deserialize(input: any): Statistics {
    Object.assign(this, input);
    this.bodyParts = input.bodyParts.map(x => new BodyPartData().deserialize(x));
    this.phases = input.phases.map(x => new PhaseData().deserialize(x));
    this.actions = input.actions.map(x => new ActionData().deserialize(x));
    this.interrupts = input.interrupts.map(x => new InterruptData().deserialize(x));
    this.actualTraits = input.actualTraits.map(x => new TraitData().deserialize(x));
    this.setupTraits = input.setupTraits.map(x => new TraitData().deserialize(x));
    this.conditionalAbilities = input.conditionalAbilities.map(x => new ConditionalAbilityData().deserialize(x));
    return this;
  }

  getActions(): ActionData[] {
    let actionList: ActionData[] = [];

    actionList = actionList.concat(this.actions);

    for (const trait of this.actualTraits) {
      for (const action of trait.actions) {
        actionList.push(action);
      }
    }

    return actionList;
  }
}

export class TraitData {
  name: string;
  displayName: string;
  tags: string[];
  description: string;
  customComponents: ItemData[];
  listedItems: ItemData[];
  actions: ActionData[];
  extraActions: ActionData[];
  interrupts: InterruptData[];
  rolls: RollData[];
  summons: SummonData[];

  dashMultiplier: number;
  defense: number;
  encounterBudget: number;
  encounterBudgetAdd: number;

  public constructor() {
    this.tags = [];
    this.customComponents = [];
    this.listedItems = [];
    this.actions = [];
    this.extraActions = [];
    this.interrupts = [];
    this.rolls = [];
    this.summons = [];
  }

  // tslint:disable-next-line:no-shadowed-variable
  public deserialize(input: any): TraitData {
    Object.assign(this, input);
    this.customComponents = input.customComponents.map(x => new ItemData().deserialize(x));
    this.listedItems = input.listedItems.map(x => new ItemData().deserialize(x));
    this.actions = input.actions.map(x => new ActionData().deserialize(x));
    this.extraActions = input.extraActions.map(x => new ActionData().deserialize(x));
    this.interrupts = input.interrupts.map(x => new InterruptData().deserialize(x));
    this.rolls = input.rolls.map(x => new RollData().deserialize(x));
    this.summons = input.summons.map(x => new SummonData().deserialize(x));
    return this;
  }
}

export class InterruptData {
  public name: string;
  public count: number;

  public recharge: number;

  public tags: string[];
  public description: string;
  public trigger: string;

  public effects: string[];
  public collide: string;

  public listedItems: ItemData[];
  public summons: SummonData[];

  public constructor() {
    this.tags = [];
    this.effects = [];
    this.listedItems = [];
    this.summons = [];
  }

  // tslint:disable-next-line:no-shadowed-variable
  public deserialize(input: any): InterruptData {
    Object.assign(this, input);
    this.listedItems = input.listedItems.map(x => new ItemData().deserialize(x));
    this.summons = input.summons.map(x => new SummonData().deserialize(x));
    return this;
  }
}

export class ActionData {
  name: string;
  actionCost: number;
  recharge: number;

  tags: string[];
  description: string;
  hit: string;
  autoHit: string;
  criticalHit: string;
  miss: string;
  areaEffect: string;

  effects: string[];
  mark: string;
  stance: string;
  collide: string;
  blightBoost: string;
  terrainEffect: string;
  specialInterrupt: string;
  specialRecharge: string;
  charge: string;
  delay: string;
  postAreaEffect: string;
  postCollide: string;

  customComponents: ItemData[];
  listedItems: ItemData[];
  rolls: RollData[];
  extraActions: ActionData[];
  summons: SummonData[];

  combo: ActionData;

  postAction: string;

  public constructor() {
    this.actionCost = 1;

    this.tags = [];
    this.effects = [];
    this.customComponents = [];
    this.listedItems = [];
    this.rolls = [];
    this.extraActions = [];
    this.summons = [];
  }

  // tslint:disable-next-line:no-shadowed-variable
  public deserialize(input: any): ActionData {
    Object.assign(this, input);
    return this;
  }
}

export class BodyPartData {
  name: string;
  hp: number;
  hpMultiplierByPlayers: boolean;
  description: string;

  // tslint:disable-next-line:no-shadowed-variable
  public deserialize(input: any): BodyPartData {
    Object.assign(this, input);
    return this;
  }
}

export class PhaseData {
  name: string;
  description: string;
  listedItems: ItemData[];
  traits: string[];
  interrupts: InterruptData[];
  actions: ActionData[];
  mActualTraits: ActionData[];

  public constructor() {
    this.listedItems = [];
    this.traits = [];
    this.interrupts = [];
    this.actions = [];
  }

  // tslint:disable-next-line:no-shadowed-variable
  public deserialize(input: any): PhaseData {
    Object.assign(this, input);
    this.listedItems = input.listedItems.map(x => new ItemData().deserialize(x));
    this.interrupts = input.interrupts.map(x => new InterruptData().deserialize(x));
    return this;
  }
}

export class SummonData {
  name: string;
  class: string;
  isObject: boolean;

  tags: string[];
  traits: string[];
  summonEffects: string[];
  summonActions: string[];
  actions: ActionData[];
  interrupts: InterruptData[];
  listedItems: ItemData[];
  listedActions: ActionData[];
  listedInterrupts: InterruptData[];

  constructor() {
    this.tags = [];
    this.traits = [];
    this.summonActions = [];
    this.summonEffects = [];
    this.actions = [];
    this.interrupts = [];
    this.listedItems = [];
    this.listedActions = [];
    this.listedInterrupts = [];
  }

  // tslint:disable-next-line:no-shadowed-variable
  public deserialize(input: any): SummonData {
    Object.assign(this, input);
    this.listedItems = input.listedItems.map(x => new ItemData().deserialize(x));
    this.actions = input.actions.map(x => new ActionData().deserialize(x));
    this.interrupts = input.interrupts.map(x => new InterruptData().deserialize(x));
    this.listedActions = input.listedActions.map(x => new ActionData().deserialize(x));
    this.listedInterrupts = input.listedInterrupts.map(x => new InterruptData().deserialize(x));
    return this;
  }
}

export class RollData {
  values: number[];

  plus: boolean;

  name: string;
  description: string;

  customComponents: ItemData[];

  // tslint:disable-next-line:no-shadowed-variable
  public deserialize(input: any): RollData {
    Object.assign(this, input);
    this.customComponents.map(x => new ItemData().deserialize(x));
    return this;
  }
}

export class ItemData {
  name: string;
  description: string;

  customComponents: ItemData[];

  public constructor() {
    this.customComponents = [];
  }

  // tslint:disable-next-line:no-shadowed-variable
  public deserialize(input: any): ItemData {
    Object.assign(this, input);
    this.customComponents = input.customComponents.map(x => new ItemData().deserialize(x));
    return this;
  }
}

export class AbilitySetData {
  name: string;
  class: string;
  description: string;

  traits: string[];
  actions: ActionData[];
  interrupts: InterruptData[];

  public constructor() {
    this.traits = [];
    this.actions = [];
    this.interrupts = [];
  }

  // tslint:disable-next-line:no-shadowed-variable
  public deserialize(input: any): AbilitySetData {
    Object.assign(this, input);
    this.actions = input.actions.map(x => new ActionData().deserialize(x));
    this.interrupts = input.interrupts.map(x => new InterruptData().deserialize(x));
    return this;
  }
}

export class ConditionalAbilityData {
  chapter: number;
  isSpecialClasses: string[];
  isNotSpecialClasses: string[];
  removeTraits: string[];
  traits: string[];
  removeInterrupts: string[];
  interrupts: string[];
  removeActions: string[];
  actions: ActionData[];
  removeSetupTraits: string[];
  setupTraits: TraitData[];
  useSpecialTemplates: string[];
  specialClass: string;
  hpMultiplier: number;

  public constructor() {
    this.isSpecialClasses = [];
    this.isNotSpecialClasses = [];
    this.removeTraits = [];
    this.traits = [];
    this.removeInterrupts = [];
    this.interrupts = [];
    this.removeActions = [];
    this.actions = [];
    this.removeSetupTraits = [];
    this.setupTraits = [];
    this.useSpecialTemplates = [];
  }

  // tslint:disable-next-line:no-shadowed-variable
  public deserialize(input: any): ConditionalAbilityData {
    Object.assign(this, input);
    this.actions = input.actions.map(x => new ActionData().deserialize(x));
    this.setupTraits = input.setupTraits.map(x => new TraitData().deserialize(x));
    return this;
  }
}
