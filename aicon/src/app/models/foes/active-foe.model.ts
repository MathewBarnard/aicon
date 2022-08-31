import {Statistics} from './statistics';
import {PositiveEffect} from '../enums/positive-effect.model';
import {Deserializable} from '../deserializable.interface';

export class ActiveFoe implements Deserializable<ActiveFoe>{
  hpCurrent: number;
  hpMax: number;
  vigor: number;
  positiveEffects: PositiveEffect[];
  positiveStatuses: PositiveStatuses;
  statuses: Statuses;
  blights: Blights;

  rechargingActions: any[];

  statistics: Statistics;

  constructor() {
    this.statuses = new Statuses();
    this.positiveStatuses = new PositiveStatuses();
    this.blights = new Blights();

    this.positiveEffects = [];
    this.rechargingActions = [];
  }

  createNew(chapter: number, data: Statistics): void {
    if (chapter && data) {
      this.statistics = data;
      this.generateStartingStats(chapter);
    }
  }

  deserialize(input: any): ActiveFoe {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, input);
    this.statistics = input.statistics ? new Statistics().deserialize(input.statistics) : new Statistics();
    this.statuses = input.statuses ? new Statuses().deserialize(input.statuses) : new Statuses();
    this.positiveStatuses = input.positiveStatuses ? new PositiveStatuses().deserialize(input.positiveStatuses) : new PositiveStatuses();
    this.blights = input.blights ? new Blights().deserialize(input.blights) : new Blights();
    return this;
  }

  generateStartingStats(chapter: number): void {
    ////////////////////////////////////////////////////////////////////////////////////
    //// HP
    const hp = this.statistics.vitality * (this.statistics.hpMultiplier ? this.statistics.hpMultiplier : 4);

    this.hpCurrent = hp;
    this.hpMax = hp;

    this.vigor = 0;
  }

  reduceHp(value: number): number {
    if (this.hpCurrent === 0) { return; }

    this.hpCurrent -= value;

    // If hp is now less than 0, set to 0 and determine how much HP was actually lost
    if (this.hpCurrent < 0) {
      value = value + this.hpCurrent;
      this.hpCurrent = 0;
    }

    return value;
  }

  reduceVigor(value: number): number {
    if (this.vigor === 0) { return; }

    this.vigor -= value;

    // If hp is now less than 0, set to 0 and determine how much HP was actually lost
    if (this.vigor < 0) {
      value = value + this.vigor;
      this.vigor = 0;
    }

    return value;
  }

  isRecharging(action): boolean {
    return this.rechargingActions.map(a => a.Name).includes(action.Name);
  }

  toggleActionRecharging(action): void {
    if (this.isRecharging(action)) {
      const i = this.rechargingActions.map(a => a.Name).indexOf(action.Name);
      if (i > -1) {
        this.rechargingActions.splice(i, 1);
      }
    }
    else {
      this.rechargingActions.push(action);
    }
  }
}

export class Blights implements Deserializable<Blights> {
  burning: boolean;
  electrified: boolean;
  frostbitten: boolean;
  poisoned: boolean;

  constructor() {
    this.deserialize({
      burning: false,
      electrified: false,
      frostbitten: false,
      poisoned: false
    });
  }

  deserialize(input: any): Blights {
    Object.assign(this, input);
    return this;
  }
}

export class Statuses implements Deserializable<Statuses>{
  blinded: boolean;
  dazed: boolean;
  hatredOfX: string;
  pacified: boolean;
  slow: boolean;
  staggered: boolean;
  stunned: boolean;
  vulnerable: boolean;
  winded: boolean;

  constructor() {
    this.deserialize({
      blinded: false,
      dazed: false,
      hatredOfX: null,
      pacified: false,
      slow: false,
      staggered: false,
      stunned: false,
      vulnerable: false,
      winded: false
    });
  }

  deserialize(input: any): Statuses {
    Object.assign(this, input);
    return this;
  }
}

export class PositiveStatuses implements Deserializable<PositiveStatuses>{
  counter: boolean;
  defiance: boolean;
  dodge: boolean;
  evasion: boolean;
  regenerationX: number;
  stealth: boolean;
  sturdy: boolean;
  trueStrike: boolean;
  unstoppable: boolean;
  vigilance: boolean;

  constructor() {
    this.deserialize({
      counter: false,
      defiance: false,
      dodge: false,
      evasion: false,
      regenerationX: null,
      stealth: false,
      sturdy: false,
      trueStrike: false,
      unstoppable: false,
      vigilance: false
    });
  }

  deserialize(input: any): PositiveStatuses {
    Object.assign(this, input);
    return this;
  }
}

export enum Blight {
  Burning,
  Electrified,
  Frostbite,
  Poisoned
}
