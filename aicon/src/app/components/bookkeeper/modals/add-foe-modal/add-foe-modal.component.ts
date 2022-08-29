import { Component, OnInit } from '@angular/core';
import {FoeType} from '../../../../models/foes/foe-type.enum';
import {MatDialogRef} from '@angular/material/dialog';
import {FoeFactory} from '../../../../models/foes/foe-factory';
import {Statistics} from '../../../../models/foes/statistics';
import {ApiService} from '../../../../services/api.service';

@Component({
  selector: 'app-add-foe-modal',
  templateUrl: './add-foe-modal.component.html',
  styleUrls: ['./add-foe-modal.component.scss']
})
export class AddFoeModalComponent implements OnInit {

  chapter;
  FoeTypeEnum = FoeType;

  factionFilter: string;
  classFilter: string;
  specialClassFilter: string;

  foeSelected: string;
  templateSelected: string;
  specialTemplateSelected: string;

  foe: Statistics;

  constructor(public dialogRef: MatDialogRef<AddFoeModalComponent>, public apiService: ApiService,
              public foeFactory: FoeFactory) { }

  ngOnInit(): void {
    this.chapter = 1;
  }


  addToEncounter(): void {
    if (!this.foeSelected) { return; }
    this.apiService.getFoeStatistics(
      this.foeSelected, parseInt(this.chapter, 10.0),
      this.templateSelected, this.specialTemplateSelected,
      null, null
    ).subscribe(foe => {
      this.dialogRef.close({
        chapter: this.chapter,
        foe: foe
      });
    });
  }

  factionFilterChanged(event): void {
    this.factionFilter = event.value;
  }

  classFilterChanged(event): void {
    this.classFilter = event.value;
  }

  specialClassFilterChanged(event): void {
    this.specialClassFilter = event.value;
  }
}
