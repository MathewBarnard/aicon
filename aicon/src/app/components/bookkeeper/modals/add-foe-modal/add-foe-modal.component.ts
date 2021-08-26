import { Component, OnInit } from '@angular/core';
import {FoeType} from "../../../../models/foes/foe-type.enum";
import {MatDialogRef} from "@angular/material/dialog";
import {FoeFactory} from "../../../../models/foes/foe-factory";
import {Foe} from "../../../../models/foes/foe.model";

@Component({
  selector: 'app-add-foe-modal',
  templateUrl: './add-foe-modal.component.html',
  styleUrls: ['./add-foe-modal.component.scss']
})
export class AddFoeModalComponent implements OnInit {

  chapter: number;
  FoeTypeEnum = FoeType;

  selectedClass: string;
  selectedJob: string;
  selectedFaction: string;
  selectedTemplate: string;

  foe: Foe;

  constructor(public dialogRef: MatDialogRef<AddFoeModalComponent>, public foeFactory: FoeFactory) { }

  ngOnInit(): void {
    this.chapter = 1;
  }


  addToEncounter() {
    this.dialogRef.close({
      chapter: this.chapter,
      foe: this.foe
    })
  }

  jobChanged(event) {
    if (event.source.value === "") { this.selectedJob = null; return}
    this.selectedJob = event.source.value;
    this.createFoe();
  }

  templateChanged(event) {
    if (event.source.value === "") { this.selectedTemplate = null; return}
    this.selectedTemplate = event.source.value;
    this.createFoe();
  }

  createFoe() {
    if (!this.selectedClass || !this.selectedJob) { return; }
    this.foeFactory.createFoe(this.selectedClass, this.selectedJob, this.selectedFaction, this.selectedTemplate).subscribe(foe => {
      this.foe = foe;
    });
  }
}
