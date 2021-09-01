export enum StatusType {
  Blind,
  Dazed,
  HatredOfX,
  Winded,
  Pacified,
  Stunned,
  Staggered,
  Slow,
  Vulnerable,
  Bloody,
  Incapacitated
}

export interface Status {
  name: string;
  description: string;
  statusType: StatusType;
}

export class HatredOfX implements Status {
  name = 'Hatred of X';
  description = `When taking actions against a foe, must include X as a target for the action to be valid,
   as long as that character is in line of sight and in range 3 of either you or your target.`;
  statusType = StatusType.HatredOfX;
  target: string;

  constructor(target: string) {
    this.target = target;
  }
}
