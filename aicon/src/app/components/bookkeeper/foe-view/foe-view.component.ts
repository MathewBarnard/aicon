import { Component, OnInit } from '@angular/core';
import {EncounterService} from "../../../services/encounter.service";
import {AddFoeModalComponent} from "../modals/add-foe-modal/add-foe-modal.component";
import {HealthAndVigorModalComponent} from "../modals/health-and-vigor-modal/health-and-vigor-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {Action, Foe} from "../../../models/foes/foe.model";
import {ActiveFoe} from "../../../models/foes/active-foe.model";

@Component({
  selector: 'app-foe-view',
  templateUrl: './foe-view.component.html',
  styleUrls: ['./foe-view.component.scss']
})
export class FoeViewComponent implements OnInit {

  foeToDelete: ActiveFoe;

  constructor(public encounterService: EncounterService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  reduceHealth(event, foe): void {
    event.stopPropagation();
    if (foe.hpCurrent === 0) {return;}

    foe.reduceHp(1);
    this.encounterService.save();
  }

  reduceVigor(event, foe): void {
    event.stopPropagation();

    if (foe.vigor === 0) {return;}
    foe.reduceVigor(1);
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

  toggleRecharge(action, foe: ActiveFoe) {
    if (!this.isRecharge(action)) { return; }
    foe.toggleActionRecharging(action);
    this.encounterService.save();
  }

  isRecharge(action): boolean {
    if (!action.Tags) { return; }
    return action.Tags.join("").toLowerCase().includes("recharge");
  }

  delete(foe: ActiveFoe) {
    if (this.foeToDelete === foe) {
      this.encounterService.removeFoeFromSession(foe);
      this.foeToDelete = null;
    } else {
      this.foeToDelete = foe;
    }
  }

  test() {
  }
}
