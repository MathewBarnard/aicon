import { Component, OnInit } from '@angular/core';
import {EncounterService} from "../../services/encounter.service";
import {MatDialog} from "@angular/material/dialog";
import {AddFoeModalComponent} from "./modals/add-foe-modal/add-foe-modal.component";
import {FoeFactory} from "../../models/foes/foe-factory";

@Component({
  selector: 'app-encounter-tracker',
  templateUrl: './encounter-tracker.component.html',
  styleUrls: ['./encounter-tracker.component.scss']
})
export class EncounterTrackerComponent implements OnInit {

  constructor(public encounterService: EncounterService, public foeFactory: FoeFactory,
              private dialog: MatDialog) { }

  ngOnInit(): void {}

  openAddFoeDialog() {
    const dialogRef = this.dialog.open(AddFoeModalComponent, {
      height: '500px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      this.encounterService.createNewFoe(result.foe, result.chapter);
    });
  }
}
