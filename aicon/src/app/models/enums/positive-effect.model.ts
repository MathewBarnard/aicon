export enum PositiveEffectType {
  Counter,
  Defiance,
  Dodge,
  Evasion,
  Guardian,
  Pierce,
  RegenerationX,
  Skirmisher,
  Stealth,
  Sturdy,
  TrueStrike,
  Unstoppable,
  Vigilance,
  VigorX
}

export interface PositiveEffect {
  name: string;
  description: string;
  positiveEffectType: PositiveEffectType;
}

export class VigorX implements PositiveEffect {
  name = 'Vigor X';
  description = `Gain a shield that goes over your hit
points, equal to X times your health value.
Damage goes to Vigor before Hit Points. Vigor
does not stack, and when you gain Vigor you can
choose to keep the old value or gain the new
value. Lose all vigor at the end of combat.`
  positiveEffectType = PositiveEffectType.Vigilance;
  x: number;
  shield: number;

  constructor(x: number, health: number) {
    this.x = x;
    this.shield = x * health;
  }
}
