export class Combatant {
  currentStats: StatBlock;
  stats: { 1: StatBlock, 2: StatBlock, 3: StatBlock }
}

export class Speed {
  base: number;
  run: number;
  dash: number;
  constructor(base: number, run: number, dash: number) {
    this.base = base;
    this.run = run;
    this.dash = dash;
  }
}

export class StatBlock {
  health: number;
  hp: number;
  attack: number;
  armor: number;
  defense: number;
  speed: Speed;
  frayDamage: number;

  constructor(health: number, hp: number, attack: number, armor: number,
              defense: number, baseSpeed: number, run: number, dash: number,
              frayDamage: number) {
    this.health = health;
    this.hp = hp;
    this.attack = attack;
    this.armor = armor;
    this.defense = defense;
    this.speed = new Speed(baseSpeed, run, dash);
    this.frayDamage = frayDamage;
  }
}
