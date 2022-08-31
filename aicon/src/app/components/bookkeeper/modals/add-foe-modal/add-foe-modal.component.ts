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

  availableFoes: string[];

  foe: Statistics;

  constructor(public dialogRef: MatDialogRef<AddFoeModalComponent>, public apiService: ApiService,
              public foeFactory: FoeFactory) { }

  ngOnInit(): void {
    this.chapter = 1;

    this.getFoes();
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
    this.getFoes();
  }

  classFilterChanged(event): void {
    this.classFilter = event.value;
    this.getFoes();
  }

  specialClassFilterChanged(event): void {
    this.specialClassFilter = event.value;
    this.getFoes();
  }

  getFoes(): void {
    this.apiService.getFoes(
      this.classFilter !== 'Any' ? this.classFilter : null,
      this.factionFilter !== 'Any' ? this.factionFilter : null,
      this.specialClassFilter !== 'Any' ? this.specialClassFilter : null)
      .subscribe(res => {
        this.availableFoes = res;
    });
  }
}
