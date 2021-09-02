import {Action, Foe} from "./foe.model";
import {Status, StatusType} from "../enums/status.model";
import {PositiveEffect} from "../enums/positive-effect.model";
import {Observable, Subject} from "rxjs";
import {EventEmitter} from "@angular/core";
import {Deserializable} from "../deserializable.interface";

export class ActiveFoe implements Deserializable<ActiveFoe>{
  chapter: number;
  hpCurrent: number;
  hpMax: number;
  vigor: number;
  attackCurrent: number;
  lightDamageCurrent: number;
  heavyDamageCurrent: number;
  criticalDamageCurrent: number;
  frayCurrent: number;
  healthCurrent: number;
  defenseCurrent: number;
  armorCurrent: number;
  positiveEffects: PositiveEffect[];

  positiveStatuses: PositiveStatuses;
  statuses: Statuses;
  blights: Blights;

  rechargingActions: any[];

  data: Foe;

  constructor() {
    this.statuses = new Statuses();
    this.positiveStatuses = new PositiveStatuses();
    this.blights = new Blights();

    this.positiveEffects = [];
    this.rechargingActions = [];
  }

  createNew(chapter: number, data: Foe): void {
    if (chapter && data) {
      this.data = data;
      this.generateStartingStats(chapter);
    }
  }

  deserialize(input: any): ActiveFoe {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, input);
    this.statuses = input.statuses ? new Statuses().deserialize(input.statuses) : new Statuses();
    this.positiveStatuses = input.positiveStatuses ? new PositiveStatuses().deserialize(input.positiveStatuses) : new PositiveStatuses();
    this.blights = input.blights ? new Blights().deserialize(input.blights) : new Blights();
    return this;
  }

  generateStartingStats(chapter: number): void {
    this.chapter = Number(chapter);

    ////////////////////////////////////////////////////////////////////////////////////
    //// DAMAGE
    this.lightDamageCurrent = this.data.LightDamage + this.chapter;
    this.heavyDamageCurrent = this.data.HeavyDamage + this.chapter;
    this.criticalDamageCurrent = this.data.CriticalDamage + this.chapter;

    this.attackCurrent = this.data.Attack[this.chapter - 1];

    ////////////////////////////////////////////////////////////////////////////////////
    //// HP
    let hp = this.data.Health[this.chapter - 1] * 4;

    if (this.data.Traits.map(t => t.Name).includes('Tenacious')) {
      hp = Math.round(hp * 1.25);
    }

    // If mob set to 1
    if (this.data.Group === 'Mob') {
      hp = 1;
    }

    this.hpCurrent = hp;
    this.hpMax = hp;

    ////////////////////////////////////////////////////////////////////////////////////
    //// VIGOR
    let v = 0;

    if (this.data.Traits.map(t => t.Name).includes('Toughness')) {
      v = 1;
    }

    this.vigor = v * this.data.Health[this.chapter  - 1];

    ////////////////////////////////////////////////////////////////////////////////////
    //// ARMOR
    let armor = this.data.Armor[this.chapter - 1];

    // Apply Improved Armor Trait
    if (this.data.Traits.find(t => t.Name === 'Improved Armor')) {
      armor += this.data.Traits.find(t => t.Name === 'Improved Armor').AddArmor;
    }

    // Poor Armor Trait
    if (this.data.Traits.map(t => t.Name).includes('Poor Armor')) {
      armor = 0;
    }

    this.armorCurrent = armor;

    ////////////////////////////////////////////////////////////////////////////////////
    /// DEFENSE
    const defense = this.data.Defense;
    this.defenseCurrent = defense;


    ////////////////////////////////////////////////////////////////////////////////////
    /// TRAITS
    if (this.data.Traits.map(t => t.Name).includes('Slow')) {
      this.statuses.slow = true;
    }
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
