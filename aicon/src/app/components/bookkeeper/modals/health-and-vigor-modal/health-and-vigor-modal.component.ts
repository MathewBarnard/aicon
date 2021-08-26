import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Foe} from "../../../../models/foes/foe.model";

@Component({
  selector: 'app-health-and-vigor-modal',
  templateUrl: './health-and-vigor-modal.component.html',
  styleUrls: ['./health-and-vigor-modal.component.scss']
})
export class HealthAndVigorModalComponent implements OnInit {

  @Inject(MAT_DIALOG_DATA) public data: any
  foe: Foe;

  constructor(public dialogRef: MatDialogRef<HealthAndVigorModalComponent>) { }

  ngOnInit(): void {
    this.foe = this.data.foe;
  }

}
