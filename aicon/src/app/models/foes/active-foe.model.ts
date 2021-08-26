import {Action, Foe} from "./foe.model";
import {Status} from "../enums/status.model";
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
  statuses: Status[];
  positiveEffects: PositiveEffect[];

  rechargingActions: any[];

  data: Foe;

  constructor() {
    this.statuses = [];
    this.positiveEffects = [];
    this.rechargingActions = [];
  }

  createNew(chapter: number, data: Foe) {
    if (chapter && data) {
      this.data = data;
      this.generateStartingStats(chapter);
    }
  }

  deserialize(input: any): ActiveFoe {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, input);
    return this;
  }

  generateStartingStats(chapter: number): void {
    this.chapter = Number(chapter);

    ////////////////////////////////////////////////////////////////////////////////////
    //// DAMAGE
    this.lightDamageCurrent = this.data.LightDamage + this.chapter;
    this.heavyDamageCurrent = this.data.HeavyDamage + this.chapter;
    this.criticalDamageCurrent = this.data.CriticalDamage + this.chapter

    this.attackCurrent = this.data.Attack[this.chapter -1];

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
    let defense = this.data.Defense;
    this.defenseCurrent = defense;
  }

  reduceHp(value: number): number {
    if (this.hpCurrent === 0) {return;}

    this.hpCurrent -= value;

    // If hp is now less than 0, set to 0 and determine how much HP was actually lost
    if (this.hpCurrent < 0) {
      value = value + this.hpCurrent;
      this.hpCurrent = 0;
    }

    return value;
  }

  reduceVigor(value: number): number {
    if (this.vigor === 0) {return;}

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

  toggleActionRecharging(action) {
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

