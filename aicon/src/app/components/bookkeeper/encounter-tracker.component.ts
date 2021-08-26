import { Component, OnInit } from '@angular/core';
import {EncounterService} from "../../services/encounter.service";
import {AbilityService} from "../../services/ability.service";
import {MatDialog} from "@angular/material/dialog";
import {AddFoeModalComponent} from "./modals/add-foe-modal/add-foe-modal.component";
import {FoeFactory} from "../../models/foes/foe-factory";

@Component({
  selector: 'app-encounter-tracker',
  templateUrl: './encounter-tracker.component.html',
  styleUrls: ['./encounter-tracker.component.scss']
})
export class EncounterTrackerComponent implements OnInit {

  constructor(public abilityService: AbilityService, public encounterService: EncounterService, public foeFactory: FoeFactory,
              private dialog: MatDialog) { }

  ngOnInit(): void {}

  openAddFoeDialog() {
    let dialogRef = this.dialog.open(AddFoeModalComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.encounterService.createNewFoe(result.foe, result.chapter);
    });
  }
}
