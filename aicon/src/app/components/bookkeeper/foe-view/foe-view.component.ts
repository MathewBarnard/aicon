import {Component, OnInit} from '@angular/core';
import {EncounterService} from '../../../services/encounter.service';
import {MatDialog} from '@angular/material/dialog';
import {ActiveFoe, Blight} from '../../../models/foes/active-foe.model';
import {StatusType} from '../../../models/enums/status.model';
import {PositiveEffectType} from '../../../models/enums/positive-effect.model';
import {AddFoeModalComponent} from '../modals/add-foe-modal/add-foe-modal.component';

@Component({
  selector: 'app-foe-view',
  templateUrl: './foe-view.component.html',
  styleUrls: ['./foe-view.component.scss']
})
export class FoeViewComponent implements OnInit {

  foeToDelete: ActiveFoe;
  BlightEnum = Blight;
  StatusTypeEnum = StatusType;
  PositiveEffectEnum = PositiveEffectType;

  constructor(public encounterService: EncounterService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  reduceHealth(event, foe): void {
    event.stopPropagation();
    if (foe.hpCurrent === 0) {return; }

    foe.reduceHp(1);
    this.encounterService.save();
  }

  reduceVigor(event, foe): void {
    event.stopPropagation();

    if (foe.vigor === 0) {return; }
    foe.reduceVigor(1);
    this.encounterService.save();
  }

  toggleBlight(blight: Blight, foe: ActiveFoe): void {
    switch (blight) {
      case Blight.Burning:
        foe.blights.burning = !foe.blights.burning;
        break;
      case Blight.Electrified:
        foe.blights.electrified = !foe.blights.electrified;
        break;
      case Blight.Frostbite:
        foe.blights.frostbitten = !foe.blights.frostbitten;
        break;
      case Blight.Poisoned:
        foe.blights.poisoned = !foe.blights.poisoned;
        break;
      default:
        break;
    }

    this.encounterService.save();
  }

  toggleStatus(status: StatusType, foe: ActiveFoe): void {
    switch (status) {
      case StatusType.Blind:
        foe.statuses.blinded = !foe.statuses.blinded;
        break;
      case StatusType.Dazed:
        foe.statuses.dazed = !foe.statuses.dazed;
        break;
      case StatusType.Pacified:
        foe.statuses.pacified = !foe.statuses.pacified;
        break;
      case StatusType.Stunned:
        foe.statuses.stunned = !foe.statuses.stunned;
        break;
      case StatusType.Staggered:
        foe.statuses.staggered = !foe.statuses.staggered;
        break;
      case StatusType.Slow:
        foe.statuses.slow = !foe.statuses.slow;
        break;
      case StatusType.Vulnerable:
        foe.statuses.vulnerable = !foe.statuses.vulnerable;
        break;
      case StatusType.Winded:
        foe.statuses.winded = !foe.statuses.winded;
        break;
      default:
        break;
    }

    this.encounterService.save();
  }

  togglePositiveEffect(positiveEffect: PositiveEffectType, foe: ActiveFoe): void {
    switch (positiveEffect) {
      case PositiveEffectType.Counter:
        foe.positiveStatuses.counter = !foe.positiveStatuses.counter;
        break;
      case PositiveEffectType.Dodge:
        foe.positiveStatuses.dodge = !foe.positiveStatuses.dodge;
        break;
      case PositiveEffectType.Defiance:
        foe.positiveStatuses.defiance = !foe.positiveStatuses.defiance;
        break;
      case PositiveEffectType.Evasion:
        foe.positiveStatuses.evasion = !foe.positiveStatuses.evasion;
        break;
      case PositiveEffectType.RegenerationX:
        foe.positiveStatuses.regenerationX = !foe.positiveStatuses.regenerationX ? 1 : null;
        break;
      case PositiveEffectType.Sturdy:
        foe.positiveStatuses.sturdy = !foe.positiveStatuses.sturdy;
        break;
      case PositiveEffectType.Stealth:
        foe.positiveStatuses.stealth = !foe.positiveStatuses.stealth;
        break;
      case PositiveEffectType.TrueStrike:
        foe.positiveStatuses.trueStrike = !foe.positiveStatuses.trueStrike;
        break;
      case PositiveEffectType.Vigilance:
        foe.positiveStatuses.vigilance = !foe.positiveStatuses.vigilance;
        break;
      case PositiveEffectType.Unstoppable:
        foe.positiveStatuses.unstoppable = !foe.positiveStatuses.unstoppable;
        break;
      default:
        break;
    }

    this.encounterService.save();
  }

  onHealthChange(event, foe): void {
    foe.hpCurrent = event.value;
    this.encounterService.save();
  }

  onVigorChange(event, foe): void {
    foe.vigor = event.value;
    this.encounterService.save();
  }

  toggleRecharge(action, foe: ActiveFoe): void {
    if (!this.isRecharge(action)) { return; }
    foe.toggleActionRecharging(action);
    this.encounterService.save();
  }

  isRecharge(action): boolean {
    if (!action.Tags) { return; }
    return action.Tags.join('').toLowerCase().includes('recharge');
  }

  delete(foe: ActiveFoe): void {
    if (this.foeToDelete === foe) {
      this.encounterService.removeFoeFromSession(foe);
      this.foeToDelete = null;
    } else {
      this.foeToDelete = foe;
    }
  }

  openAddFoeDialog(): void {
    const dialogRef = this.dialog.open(AddFoeModalComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.encounterService.createNewFoe(result.foe, result.chapter);
    });
  }
}
